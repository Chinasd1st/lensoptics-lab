#!/usr/bin/env python3
"""
Tailwind CSS WCAG Accessibility Auditor

Recursively scans .tsx/.jsx files, extracts className attributes, parses Tailwind
color classes, converts all color formats (OKLCH/RGB/HSL/hex) to sRGB, and checks
foreground/background contrast ratios against WCAG 2.1 AA (4.5:1) and AAA (7:1).

Usage:
    python audit_wcag.py [ROOT_DIR] [--output REPORT.md] [--threshold aa|aaa]

Dependencies: None (stdlib only).
"""

from __future__ import annotations

import argparse
import ast
import colorsys
import json
import math
import re
import sys
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path
from typing import Any


# ---------------------------------------------------------------------------
# Color data structures
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class SrgbColor:
    """sRGB color with components in [0, 1]."""
    r: float
    g: float
    b: float

    def to_hex(self) -> str:
        r = max(0, min(255, round(self.r * 255)))
        g = max(0, min(255, round(self.g * 255)))
        b = max(0, min(255, round(self.b * 255)))
        return f"#{r:02x}{g:02x}{b:02x}"


@dataclass(frozen=True)
class NamedColor:
    css_name: str
    srgb: SrgbColor


# ---------------------------------------------------------------------------
# CSS named colors (subset most likely to appear in Tailwind)
# ---------------------------------------------------------------------------

CSS_NAMED_COLORS: dict[str, SrgbColor] = {
    "white": SrgbColor(1.0, 1.0, 1.0),
    "black": SrgbColor(0.0, 0.0, 0.0),
    "red": SrgbColor(1.0, 0.0, 0.0),
    "green": SrgbColor(0.0, 0.5, 0.0),
    "blue": SrgbColor(0.0, 0.0, 1.0),
    "yellow": SrgbColor(1.0, 1.0, 0.0),
    "cyan": SrgbColor(0.0, 1.0, 1.0),
    "magenta": SrgbColor(1.0, 0.0, 1.0),
    "transparent": SrgbColor(0.0, 0.0, 0.0),  # treated as no color
    "inherit": SrgbColor(0.0, 0.0, 0.0),
    "current": SrgbColor(0.0, 0.0, 0.0),
    "zinc-50": SrgbColor(0.98, 0.98, 0.98),
    "zinc-100": SrgbColor(0.96, 0.96, 0.96),
    "zinc-200": SrgbColor(0.90, 0.90, 0.91),
    "zinc-300": SrgbColor(0.82, 0.82, 0.84),
    "zinc-400": SrgbColor(0.63, 0.63, 0.65),
    "zinc-500": SrgbColor(0.44, 0.44, 0.46),
    "zinc-600": SrgbColor(0.33, 0.33, 0.35),
    "zinc-700": SrgbColor(0.25, 0.25, 0.27),
    "zinc-800": SrgbColor(0.15, 0.15, 0.16),
    "zinc-900": SrgbColor(0.09, 0.09, 0.10),
    "zinc-950": SrgbColor(0.04, 0.04, 0.04),
    "primary-50": SrgbColor(0.91, 0.99, 0.99),
    "primary-100": SrgbColor(0.78, 0.97, 0.96),
    "primary-200": SrgbColor(0.54, 0.93, 0.91),
    "primary-300": SrgbColor(0.24, 0.87, 0.83),
    "primary-400": SrgbColor(0.04, 0.74, 0.68),
    "primary-500": SrgbColor(0.00, 0.60, 0.54),
    "primary-600": SrgbColor(0.00, 0.48, 0.43),
    "primary-700": SrgbColor(0.00, 0.39, 0.35),
    "primary-800": SrgbColor(0.00, 0.32, 0.29),
    "primary-900": SrgbColor(0.00, 0.27, 0.24),
    "accent-400": SrgbColor(0.98, 0.75, 0.20),
    "accent-500": SrgbColor(0.96, 0.63, 0.07),
}


# ---------------------------------------------------------------------------
# Color conversion utilities
# ---------------------------------------------------------------------------

def hex_to_srgb(hex_color: str) -> SrgbColor:
    """Convert #RRGGBB or #RGB to SrgbColor."""
    h = hex_color.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) == 8:  # #RRGGBBAA — ignore alpha
        h = h[:6]
    r = int(h[0:2], 16) / 255.0
    g = int(h[2:4], 16) / 255.0
    b = int(h[4:6], 16) / 255.0
    return SrgbColor(r, g, b)


def rgb_to_srgb(r: float, g: float, b: float) -> SrgbColor:
    """Convert 0-255 RGB to SrgbColor."""
    return SrgbColor(r / 255.0, g / 255.0, b / 255.0)


def hsl_to_srgb(h: float, s: float, l: float) -> SrgbColor:
    """
    Convert HSL to sRGB.
    h in [0, 360], s and l in [0, 100] (CSS convention).
    """
    r, g, b = colorsys.hls_to_rgb(h / 360.0, l / 100.0, s / 100.0)
    return SrgbColor(r, g, b)


def _oklab_to_linear_srgb(l: float, a: float, b: float) -> tuple[float, float, float]:
    """OKLab → linear sRGB (components may be outside [0, 1])."""
    l_ = l + 0.3963377774 * a + 0.2158037573 * b
    m_ = l - 0.1055613458 * a - 0.0638541728 * b
    s_ = l - 0.0894841775 * a - 1.2914855480 * b

    l_c = l_ * l_ * l_
    m_c = m_ * m_ * m_
    s_c = s_ * s_ * s_

    r_lin = +4.0767416621 * l_c - 3.3077115913 * m_c + 0.2309699292 * s_c
    g_lin = -1.2684380046 * l_c + 2.6097574011 * m_c - 0.3413193965 * s_c
    b_lin = -0.0041960863 * l_c - 0.7034186147 * m_c + 1.7076147010 * s_c

    return r_lin, g_lin, b_lin


def _linear_to_srgb(c: float) -> float:
    """Linear sRGB → gamma-corrected sRGB."""
    if c <= 0.0031308:
        return 12.92 * c
    return 1.055 * (c ** (1.0 / 2.4)) - 0.055


def oklch_to_srgb(l: float, c: float, h: float) -> SrgbColor:
    """
    Convert OKLCH to sRGB.
    l in [0, 1], c in [0, ~0.4], h in [0, 360] degrees.
    Returns clamped sRGB values.
    """
    h_rad = math.radians(h)
    a = c * math.cos(h_rad)
    b = c * math.sin(h_rad)

    r_lin, g_lin, b_lin = _oklab_to_linear_srgb(l, a, b)

    r = max(0.0, min(1.0, _linear_to_srgb(r_lin)))
    g = max(0.0, min(1.0, _linear_to_srgb(g_lin)))
    b_val = max(0.0, min(1.0, _linear_to_srgb(b_lin)))

    return SrgbColor(r, g, b_val)


# ---------------------------------------------------------------------------
# Parsing arbitrary Tailwind color values
# ---------------------------------------------------------------------------

_ARBITRARY_RE = re.compile(
    r"^(?P<space>oklch|oklab|rgb|hsl|hwb|lab|lch)"
    r"\((?P<args>[^)]+)\)$",
    re.IGNORECASE,
)


def _split_args(args_str: str) -> list[str]:
    """Split color function arguments by whitespace, respecting slash for alpha."""
    return args_str.strip().split()


def parse_arbitrary_color(value: str) -> SrgbColor | None:
    """
    Parse an arbitrary Tailwind color value like:
      oklch(0.15 0.01 286)
      rgb(255 128 0)
      hsl(200 50% 50%)
      #ff8000
    """
    value = value.strip()

    # Hex
    if value.startswith("#"):
        try:
            return hex_to_srgb(value)
        except (ValueError, IndexError):
            return None

    m = _ARBITRARY_RE.match(value)
    if not m:
        return None

    space = m.group("space").lower()
    args = _split_args(m.group("args"))
    if not args:
        return None

    try:
        if space in ("oklch",):
            l = float(args[0])
            c = float(args[1].rstrip("%"))
            h = float(args[2].rstrip("deg"))
            return oklch_to_srgb(l, c, h)

        if space in ("oklab",):
            l = float(args[0])
            a = float(args[1])
            b = float(args[2])
            r_lin, g_lin, b_lin = _oklab_to_linear_srgb(l, a, b)
            return SrgbColor(
                max(0.0, min(1.0, _linear_to_srgb(r_lin))),
                max(0.0, min(1.0, _linear_to_srgb(g_lin))),
                max(0.0, min(1.0, _linear_to_srgb(b_lin))),
            )

        if space in ("rgb", "rgba"):
            vals = [float(a.rstrip("%,")) for a in args[:3]]
            # If values are percentages, scale
            if any(v > 1 for v in vals):
                return rgb_to_srgb(*vals)
            return SrgbColor(*vals)

        if space in ("hsl", "hsla"):
            h = float(args[0].rstrip("deg,"))
            s = float(args[1].rstrip("%,"))
            l = float(args[2].rstrip("%,"))
            return hsl_to_srgb(h, s, l)

        if space in ("lab",):
            # CIE Lab — approximate conversion
            L = float(args[0])
            a = float(args[1])
            b = float(args[2])
            # Normalize to [0,1] range roughly
            l_norm = L / 100.0
            a_norm = a / 128.0
            b_norm = b / 128.0
            r_lin, g_lin, b_lin = _oklab_to_linear_srgb(l_norm, a_norm, b_norm)
            return SrgbColor(
                max(0.0, min(1.0, _linear_to_srgb(r_lin))),
                max(0.0, min(1.0, _linear_to_srgb(g_lin))),
                max(0.0, min(1.0, _linear_to_srgb(b_lin))),
            )

        if space in ("lch",):
            L = float(args[0])
            c_val = float(args[1])
            h = float(args[2].rstrip("deg"))
            l_norm = L / 100.0
            c_norm = c_val / 150.0
            return oklch_to_srgb(l_norm, c_norm, h)

        if space in ("hwb",):
            h = float(args[0].rstrip("deg,"))
            w = float(args[1].rstrip("%,")) / 100.0
            b_val = float(args[2].rstrip("%,")) / 100.0
            # HWB → RGB
            if w + b_val >= 1:
                gray = w / (w + b_val)
                return SrgbColor(gray, gray, gray)
            rgb_raw = colorsys.hls_to_rgb(h / 360.0, 0.5, 1.0)
            r = w + (rgb_raw[0] - w) * (1.0 - b_val)
            g = w + (rgb_raw[1] - w) * (1.0 - b_val)
            b_rgb = w + (rgb_raw[2] - w) * (1.0 - b_val)
            return SrgbColor(r, g, b_rgb)

    except (ValueError, IndexError, ZeroDivisionError):
        return None

    return None


# ---------------------------------------------------------------------------
# Tailwind color class resolution
# ---------------------------------------------------------------------------

_TAILWIND_COLOR_PATTERNS = [
    # bg-*, text-*, border-*, ring-*, outline-*, fill-*, stroke-*, from-*, to-*, via-*
    re.compile(
        r"^(?P<prefix>bg|text|border|ring|outline|fill|stroke|from|to|via|shadow|decoration|caret|divide|accent|placeholder)"
        r"-(?P<color>.+)$"
    ),
]

_COLOR_PREFIX_MAP: dict[str, str] = {
    "bg": "background",
    "text": "foreground",
    "border": "border",
    "ring": "ring",
    "outline": "outline",
    "fill": "fill",
    "stroke": "stroke",
    "from": "gradient-from",
    "to": "gradient-to",
    "via": "gradient-via",
    "shadow": "shadow",
    "decoration": "decoration",
    "caret": "caret",
    "divide": "divide",
    "accent": "accent",
    "placeholder": "placeholder",
}


def resolve_tailwind_color(
    color_name: str,
    palette: dict[str, Any] | None = None,
) -> SrgbColor | None:
    """
    Resolve a Tailwind color token to SrgbColor.
    Handles: zinc-50, red-500, primary-600, black, white, etc.
    """
    palette = palette or {}

    # Check named colors first
    if color_name in CSS_NAMED_COLORS:
        return CSS_NAMED_COLORS[color_name]

    # Check custom palette
    if color_name in palette:
        val = palette[color_name]
        if isinstance(val, str):
            return parse_arbitrary_color(val)
        if isinstance(val, dict):
            return None  # nested, need shade

    # Try shade parsing (e.g., zinc-500 → base "zinc", shade "500")
    parts = color_name.rsplit("-", 1)
    if len(parts) == 2:
        base, shade = parts
        if base in palette and isinstance(palette[base], dict):
            val = palette[base].get(shade)
            if isinstance(val, str):
                return parse_arbitrary_color(val)

    # Fallback: try common Tailwind defaults
    if color_name in CSS_NAMED_COLORS:
        return CSS_NAMED_COLORS[color_name]

    return None


# ---------------------------------------------------------------------------
# WCAG contrast ratio
# ---------------------------------------------------------------------------

def _relative_luminance(color: SrgbColor) -> float:
    """Calculate relative luminance per WCAG 2.1."""
    def linearize(c: float) -> float:
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r = linearize(color.r)
    g = linearize(color.g)
    b = linearize(color.b)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_ratio(c1: SrgbColor, c2: SrgbColor) -> float:
    """Calculate WCAG contrast ratio between two sRGB colors."""
    l1 = _relative_luminance(c1)
    l2 = _relative_luminance(c2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


# ---------------------------------------------------------------------------
# Tailwind config loader
# ---------------------------------------------------------------------------

def load_tailwind_palette(config_path: Path) -> dict[str, Any]:
    """
    Attempt to extract color palette from tailwind.config.js / .ts / .mjs.
    Uses regex-based extraction (no JS engine).
    """
    palette: dict[str, Any] = {}
    try:
        content = config_path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return palette

    # Look for colors: { ... } block — simplified extraction
    # This handles flat and one-level-nested color definitions
    colors_match = re.search(
        r"colors\s*[:=]\s*\{",
        content,
    )
    if not colors_match:
        return palette

    # Find the matching closing brace (simplified — may not handle deep nesting)
    start = colors_match.end()
    depth = 1
    pos = start
    while pos < len(content) and depth > 0:
        ch = content[pos]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        pos += 1

    colors_block = content[start:pos - 1]

    # Extract flat colors: 'name': '#hex' or "name": "..."
    for m in re.finditer(
        r"""['"]?(\w[\w-]*)['"]?\s*[:=]\s*['"]([^'"]+)['"]""",
        colors_block,
    ):
        name, value = m.group(1), m.group(2)
        if value.startswith("#") or value.startswith(("rgb", "hsl", "oklch", "oklab", "hwb")):
            palette[name] = value

    # Extract nested colors (e.g., zinc: { '50': '#...', ... })
    for m in re.finditer(
        r"""['"]?(\w[\w-]*)['"]?\s*[:=]\s*\{([^}]+)\}""",
        colors_block,
    ):
        base_name = m.group(1)
        inner = m.group(2)
        nested: dict[str, str] = {}
        for im in re.finditer(
            r"""['"]?(\w[\w-]*)['"]?\s*[:=]\s*['"]([^'"]+)['"]""",
            inner,
        ):
            nested[im.group(1)] = im.group(2)
        if nested:
            palette[base_name] = nested

    return palette


# ---------------------------------------------------------------------------
# TSX className extraction
# ---------------------------------------------------------------------------

@dataclass
class ClassOccurrence:
    """A single className occurrence in a TSX file."""
    file: Path
    line_number: int
    element_tag: str
    raw_class_string: str
    is_dark_variant: bool = False
    context: str = ""  # surrounding code for context


# Regex patterns for className extraction
_CLASSNAME_STRING_RE = re.compile(
    r"""className\s*=\s*["']([^"']*)["']""",
)

_CLASSNAME_TEMPLATE_RE = re.compile(
    r"""className\s*=\s*\{(?:`([^`]*)`|["']([^"']*)["'])\}""",
)

_CLASSNAME_EXPR_RE = re.compile(
    r"""className\s*=\s*\{([^}]+)\}""",
)

# JSX element tag extraction
_ELEMENT_TAG_RE = re.compile(
    r"<(\w[\w.]*)\s",
)

# Dark variant detection in template strings
_DARK_CLASS_RE = re.compile(r"\bdark:([^:\s]+)")

# Tailwind class tokenization (splits by whitespace, handles arbitrary values)
_TW_CLASS_RE = re.compile(r"\S+")


def extract_classnames_from_file(file_path: Path) -> list[ClassOccurrence]:
    """Extract all className occurrences from a TSX/JSX file."""
    occurrences: list[ClassOccurrence] = []

    try:
        content = file_path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as e:
        print(f"  [WARN] Could not read {file_path}: {e}", file=sys.stderr)
        return occurrences

    lines = content.splitlines()

    for line_idx, line in enumerate(lines, start=1):
        # Determine the JSX element tag for this line
        tag_match = _ELEMENT_TAG_RE.search(line)
        element_tag = tag_match.group(1) if tag_match else "unknown"

        # 1. Simple string className="..."
        for m in _CLASSNAME_STRING_RE.finditer(line):
            occurrences.append(ClassOccurrence(
                file=file_path,
                line_number=line_idx,
                element_tag=element_tag,
                raw_class_string=m.group(1),
                context=line.strip(),
            ))

        # 2. Template literal className={`...`} or className={`...`}
        for m in _CLASSNAME_TEMPLATE_RE.finditer(line):
            class_str = m.group(1) or m.group(2) or ""
            occurrences.append(ClassOccurrence(
                file=file_path,
                line_number=line_idx,
                element_tag=element_tag,
                raw_class_string=class_str,
                context=line.strip(),
            ))

        # 3. Expression className={...} — try to extract string literals
        for m in _CLASSNAME_EXPR_RE.finditer(line):
            expr = m.group(1)
            # Skip if already handled by template regex
            if "`" in expr:
                continue
            # Extract quoted strings within the expression
            for inner in re.finditer(r"""["']([^"']+)["']""", expr):
                occurrences.append(ClassOccurrence(
                    file=file_path,
                    line_number=line_idx,
                    element_tag=element_tag,
                    raw_class_string=inner.group(1),
                    context=line.strip(),
                ))

    return occurrences


# ---------------------------------------------------------------------------
# Tailwind class parsing
# ---------------------------------------------------------------------------

@dataclass
class ParsedColorClass:
    """A parsed Tailwind color class."""
    original: str
    prefix: str  # bg, text, border, etc.
    color_type: str  # foreground, background, border, etc.
    color_name: str  # zinc-500, oklch(...), etc.
    is_dark_variant: bool
    resolved_color: SrgbColor | None
    is_arbitrary: bool


def parse_color_classes(
    class_string: str,
    palette: dict[str, Any] | None = None,
) -> list[ParsedColorClass]:
    """Parse a className string and extract all color-related Tailwind classes."""
    results: list[ParsedColorClass] = []

    # Split into tokens, handling arbitrary values with brackets
    tokens = _split_tailwind_classes(class_string)

    for token in tokens:
        is_dark = token.startswith("dark:")
        clean_token = token.removeprefix("dark:") if is_dark else token

        for pattern in _TAILWIND_COLOR_PATTERNS:
            m = pattern.match(clean_token)
            if not m:
                continue

            prefix = m.group("prefix")
            color_name = m.group("color")
            color_type = _COLOR_PREFIX_MAP.get(prefix, prefix)

            is_arbitrary = color_name.startswith("[") and color_name.endswith("]")
            resolved: SrgbColor | None = None

            if is_arbitrary:
                inner = color_name[1:-1]
                resolved = parse_arbitrary_color(inner)
            else:
                resolved = resolve_tailwind_color(color_name, palette)

            results.append(ParsedColorClass(
                original=token,
                prefix=prefix,
                color_type=color_type,
                color_name=color_name,
                is_dark_variant=is_dark,
                resolved_color=resolved,
                is_arbitrary=is_arbitrary,
            ))
            break  # matched a color pattern

    return results


def _split_tailwind_classes(class_string: str) -> list[str]:
    """
    Split a className string into individual Tailwind classes.
    Handles arbitrary values containing spaces inside [...].
    """
    classes: list[str] = []
    current = ""
    bracket_depth = 0

    for ch in class_string:
        if ch == "[":
            bracket_depth += 1
            current += ch
        elif ch == "]":
            bracket_depth -= 1
            current += ch
        elif ch in (" ", "\t", "\n") and bracket_depth == 0:
            if current.strip():
                classes.append(current.strip())
            current = ""
        else:
            current += ch

    if current.strip():
        classes.append(current.strip())

    return classes


# ---------------------------------------------------------------------------
# Contrast checking logic
# ---------------------------------------------------------------------------

class WcagLevel(Enum):
    AA = "AA"
    AAA = "AAA"


@dataclass
class ContrastIssue:
    """A single contrast issue found."""
    file: Path
    line_number: int
    element_tag: str
    foreground_class: str
    background_class: str
    foreground_color: SrgbColor
    background_color: SrgbColor
    ratio: float
    required_aa: float
    required_aaa: float
    passes_aa: bool
    passes_aaa: bool
    context: str
    suggestion: str = ""


def check_contrast(
    fg: ParsedColorClass,
    bg: ParsedColorClass,
    occurrence: ClassOccurrence,
    min_ratio: float = 4.5,
) -> ContrastIssue | None:
    """Check contrast between a foreground and background color class."""
    if fg.resolved_color is None or bg.resolved_color is None:
        return None

    # Only check matching theme variants (both dark or both light)
    if fg.is_dark_variant != bg.is_dark_variant:
        return None

    ratio = contrast_ratio(fg.resolved_color, bg.resolved_color)
    passes_aa = ratio >= min_ratio
    passes_aaa = ratio >= 7.0

    if passes_aaa:
        return None  # No issue

    # Build suggestion
    suggestion = _build_suggestion(fg, bg, ratio, passes_aa, min_ratio)

    return ContrastIssue(
        file=occurrence.file,
        line_number=occurrence.line_number,
        element_tag=occurrence.element_tag,
        foreground_class=fg.original,
        background_class=bg.original,
        foreground_color=fg.resolved_color,
        background_color=bg.resolved_color,
        ratio=ratio,
        required_aa=min_ratio,
        required_aaa=7.0,
        passes_aa=passes_aa,
        passes_aaa=passes_aaa,
        context=occurrence.context,
        suggestion=suggestion,
    )


def _build_suggestion(
    fg: ParsedColorClass,
    bg: ParsedColorClass,
    ratio: float,
    passes_aa: bool,
    min_ratio: float = 4.5,
) -> str:
    """Generate a human-readable suggestion for fixing the contrast issue."""
    fg_hex = fg.resolved_color.to_hex() if fg.resolved_color else "unknown"
    bg_hex = bg.resolved_color.to_hex() if bg.resolved_color else "unknown"

    if passes_aa:
        return (
            f"Passes AA ({ratio:.2f}:1 >= {min_ratio:.1f}:1) but fails AAA. "
            f"Consider adjusting `{fg.original}` (currently {fg_hex}) or `{bg.original}` ({bg_hex}) for AAA compliance."
        )

    return (
        f"Fails AA (needs {min_ratio:.1f}:1, got {ratio:.2f}:1). "
        f"Fix: adjust `{fg.original}` (currently {fg_hex}) or `{bg.original}` ({bg_hex})."
    )

    return (
        f"Fails AA (needs 4.5:1, got {ratio:.2f}:1). "
        f"Options: (1) Use a darker {fg.prefix} color, e.g., {fg.prefix}-{fg.color_name.replace('zinc', 'zinc-900')}; "
        f"(2) Use a lighter {bg.prefix} color; "
        f"(3) Increase font size to 18px+ (AA requires only 3:1 for large text)."
    )


# ---------------------------------------------------------------------------
# Markdown report generation
# ---------------------------------------------------------------------------

def generate_report(
    issues: list[ContrastIssue],
    total_files: int,
    total_occurrences: int,
    total_color_classes: int,
    root_dir: Path,
) -> str:
    """Generate a detailed Markdown report."""
    lines: list[str] = []

    lines.append("# WCAG Contrast Accessibility Report")
    lines.append("")
    lines.append(f"**Scanned directory:** `{root_dir}`")
    lines.append(f"**Files scanned:** {total_files}")
    lines.append(f"**Total className occurrences:** {total_occurrences}")
    lines.append(f"**Total color classes analyzed:** {total_color_classes}")
    lines.append("")

    # Summary
    fail_aa = [i for i in issues if not i.passes_aa]
    fail_aaa_only = [i for i in issues if i.passes_aa and not i.passes_aaa]

    lines.append("## Summary")
    lines.append("")
    lines.append("| Metric | Count |")
    lines.append("|--------|-------|")
    lines.append(f"| Total issues | {len(issues)} |")
    lines.append(f"| Fails AA (4.5:1) | {len(fail_aa)} |")
    lines.append(f"| Passes AA, fails AAA (7:1) | {len(fail_aaa_only)} |")
    lines.append("")

    if not issues:
        lines.append("All checked color combinations pass WCAG AA contrast requirements.")
        lines.append("")
        return "\n".join(lines)

    # Issues grouped by severity
    lines.append("## Issues")
    lines.append("")

    # Critical: fails AA
    if fail_aa:
        lines.append("### Critical — Fails WCAG AA (4.5:1)")
        lines.append("")
        for issue in fail_aa:
            _append_issue_md(lines, issue)

    # Warning: passes AA, fails AAA
    if fail_aaa_only:
        lines.append("### Warning — Passes AA, Fails AAA (7:1)")
        lines.append("")
        for issue in fail_aaa_only:
            _append_issue_md(lines, issue)

    # Appendix: color reference
    lines.append("## Color Reference")
    lines.append("")
    lines.append("| Class | Resolved Color | Hex |")
    lines.append("|-------|---------------|-----|")
    seen: set[str] = set()
    for issue in issues:
        for cls, color in [
            (issue.foreground_class, issue.foreground_color),
            (issue.background_class, issue.background_color),
        ]:
            key = f"{cls}:{color.to_hex()}"
            if key not in seen:
                seen.add(key)
                swatch = _color_swatch(color)
                lines.append(f"| `{cls}` | {swatch} | `{color.to_hex()}` |")
    lines.append("")

    return "\n".join(lines)


def _append_issue_md(lines: list[str], issue: ContrastIssue) -> None:
    """Append a single issue to the Markdown report."""
    status = "FAIL" if not issue.passes_aa else "WARN"
    rel_path = issue.file
    try:
        rel_path = issue.file.relative_to(Path.cwd())
    except ValueError:
        pass
    lines.append(f"#### [{status}] `{rel_path}`:{issue.line_number}")
    lines.append("")
    lines.append(f"- **Element:** `<{issue.element_tag}>`")
    lines.append(f"- **Foreground:** `{issue.foreground_class}` → `{issue.foreground_color.to_hex()}`")
    lines.append(f"- **Background:** `{issue.background_class}` → `{issue.background_color.to_hex()}`")
    lines.append(f"- **Contrast ratio:** `{issue.ratio:.2f}:1`")
    lines.append(f"- **WCAG AA (4.5:1):** {'Pass' if issue.passes_aa else 'FAIL'}")
    lines.append(f"- **WCAG AAA (7:1):** {'Pass' if issue.passes_aaa else 'FAIL'}")
    lines.append("")
    if issue.context:
        lines.append(f"```tsx")
        lines.append(issue.context)
        lines.append("```")
        lines.append("")
    if issue.suggestion:
        lines.append(f"> {issue.suggestion}")
        lines.append("")


def _color_swatch(color: SrgbColor) -> str:
    """Generate an inline HTML color swatch for Markdown."""
    hex_val = color.to_hex()
    return f'<span style="display:inline-block;width:12px;height:12px;background:{hex_val};border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span>'


# ---------------------------------------------------------------------------
# Main audit logic
# ---------------------------------------------------------------------------

def find_tsx_files(root: Path) -> list[Path]:
    """Recursively find all .tsx and .jsx files, skipping node_modules and dist."""
    skip_dirs = {"node_modules", "dist", ".git", ".next", ".nuxt", "coverage"}
    files: list[Path] = []
    for path in sorted(root.rglob("*")):
        if path.is_file() and path.suffix in (".tsx", ".jsx"):
            # Skip if any parent is in skip_dirs
            if any(part in skip_dirs for part in path.parts):
                continue
            files.append(path)
    return files


def run_audit(
    root_dir: Path,
    output_path: Path | None = None,
    threshold: str = "aa",
    check_implicit: bool = False,
) -> None:
    """Run the full accessibility audit."""
    print(f"Scanning: {root_dir}")

    # Load Tailwind palette
    palette: dict[str, Any] = {}
    for config_name in ("tailwind.config.js", "tailwind.config.ts", "tailwind.config.mjs"):
        config_path = root_dir / config_name
        if config_path.exists():
            palette = load_tailwind_palette(config_path)
            print(f"  Loaded palette from {config_name} ({len(palette)} entries)")
            break

    # Find files
    tsx_files = find_tsx_files(root_dir)
    print(f"  Found {len(tsx_files)} TSX/JSX files")

    # Extract and analyze
    all_occurrences: list[ClassOccurrence] = []
    all_color_classes: list[tuple[ClassOccurrence, ParsedColorClass]] = []

    for f in tsx_files:
        occs = extract_classnames_from_file(f)
        all_occurrences.extend(occs)
        for occ in occs:
            color_classes = parse_color_classes(occ.raw_class_string, palette)
            for cc in color_classes:
                all_color_classes.append((occ, cc))

    print(f"  Found {len(all_occurrences)} className occurrences")
    print(f"  Found {len(all_color_classes)} color classes")

    # Group by occurrence for fg/bg pairing
    issues: list[ContrastIssue] = []
    seen_pairs: set[tuple[int, str, str]] = set()

    # Build per-occurrence color class map
    occ_color_map: dict[int, list[ParsedColorClass]] = {}
    occ_lookup: dict[int, ClassOccurrence] = {}
    for occ, cc in all_color_classes:
        occ_id = id(occ)
        occ_lookup[occ_id] = occ
        if occ_id not in occ_color_map:
            occ_color_map[occ_id] = []
        occ_color_map[occ_id].append(cc)

    # Check fg/bg pairs within same occurrence (explicit classes only)
    for occ_id, classes in occ_color_map.items():
        fg_types = {"foreground", "text", "decoration", "caret", "placeholder", "fill", "stroke"}
        bg_types = {"background"}
        border_types = {"border", "ring", "outline", "divide", "accent", "placeholder"}

        fg_classes = [c for c in classes if c.color_type in fg_types and c.resolved_color is not None]
        bg_classes = [c for c in classes if c.color_type in bg_types and c.resolved_color is not None]
        border_classes = [c for c in classes if c.color_type in border_types and c.resolved_color is not None]

        # Only check explicit fg+bg pairs (no implicit backgrounds)
        for fg in fg_classes:
            for bg in bg_classes:
                pair_key = (occ_id, fg.original, bg.original)
                if pair_key in seen_pairs:
                    continue
                seen_pairs.add(pair_key)

                orig_occ = occ_lookup[occ_id]
                issue = check_contrast(fg, bg, orig_occ)
                if issue:
                    issues.append(issue)

        # Also check border vs bg contrast (decorative borders should be visible)
        # Non-text UI components need 3:1 per WCAG 2.1 SC 1.4.11
        for border in border_classes:
            for bg in bg_classes:
                pair_key = (occ_id, border.original, bg.original)
                if pair_key in seen_pairs:
                    continue
                seen_pairs.add(pair_key)

                orig_occ = occ_lookup[occ_id]
                issue = check_contrast(border, bg, orig_occ, min_ratio=3.0)
                if issue:
                    issues.append(issue)

        # Check text vs bg for gradient classes (from-*, to-*, via-*)
        gradient_classes = [c for c in classes if c.color_type.startswith("gradient") and c.resolved_color is not None]
        if gradient_classes and fg_classes:
            for fg in fg_classes:
                for grad in gradient_classes:
                    pair_key = (occ_id, fg.original, grad.original)
                    if pair_key in seen_pairs:
                        continue
                    seen_pairs.add(pair_key)

                    orig_occ = occ_lookup[occ_id]
                    issue = check_contrast(fg, grad, orig_occ)
                    if issue:
                        issues.append(issue)

        # Optional: check against implicit backgrounds
        if check_implicit and not bg_classes and fg_classes:
            implicit_bgs = [
                ParsedColorClass(
                    original="bg-white (implicit light)",
                    prefix="bg",
                    color_type="background",
                    color_name="white",
                    is_dark_variant=False,
                    resolved_color=CSS_NAMED_COLORS.get("white"),
                    is_arbitrary=False,
                ),
                ParsedColorClass(
                    original="bg-zinc-900 (implicit dark)",
                    prefix="bg",
                    color_type="background",
                    color_name="zinc-900",
                    is_dark_variant=True,
                    resolved_color=CSS_NAMED_COLORS.get("zinc-900"),
                    is_arbitrary=False,
                ),
            ]
            for fg in fg_classes:
                for bg in implicit_bgs:
                    # Only check matching theme variants
                    if fg.is_dark_variant != bg.is_dark_variant:
                        continue
                    pair_key = (occ_id, fg.original, bg.original)
                    if pair_key in seen_pairs:
                        continue
                    seen_pairs.add(pair_key)

                    orig_occ = occ_lookup[occ_id]
                    issue = check_contrast(fg, bg, orig_occ)
                    if issue:
                        issues.append(issue)

    # Sort: critical first, then by ratio
    issues.sort(key=lambda i: (i.passes_aa, i.ratio))

    # Generate report
    report = generate_report(
        issues=issues,
        total_files=len(tsx_files),
        total_occurrences=len(all_occurrences),
        total_color_classes=len(all_color_classes),
        root_dir=root_dir,
    )

    # Output
    if output_path:
        output_path.write_text(report, encoding="utf-8")
        print(f"\nReport written to: {output_path}")
    else:
        print("\n" + report)

    # Exit code
    fail_count = sum(1 for i in issues if not i.passes_aa)
    if fail_count > 0:
        print(f"\n{fail_count} critical contrast issue(s) found.")
        sys.exit(1)
    else:
        print("\nAll contrast checks passed.")
        sys.exit(0)


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Tailwind CSS WCAG Contrast Accessibility Auditor",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python audit_wcag.py .
  python audit_wcag.py ./src --output report.md
  python audit_wcag.py /path/to/project --threshold aaa
        """,
    )
    parser.add_argument(
        "root",
        nargs="?",
        default=".",
        help="Root directory to scan (default: current directory)",
    )
    parser.add_argument(
        "--output", "-o",
        type=str,
        default=None,
        help="Output Markdown report path (default: stdout)",
    )
    parser.add_argument(
        "--threshold", "-t",
        choices=["aa", "aaa"],
        default="aa",
        help="Minimum WCAG level to enforce (default: aa)",
    )
    parser.add_argument(
        "--palette", "-p",
        type=str,
        default=None,
        help="Path to tailwind.config file (auto-detected by default)",
    )
    parser.add_argument(
        "--check-implicit",
        action="store_true",
        default=False,
        help="Also check against implicit backgrounds (white for light, zinc-900 for dark). May produce false positives.",
    )

    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.is_dir():
        print(f"Error: {root} is not a directory", file=sys.stderr)
        sys.exit(2)

    output_path = Path(args.output) if args.output else None

    # Override palette if specified
    palette_override: dict[str, Any] = {}
    if args.palette:
        palette_path = Path(args.palette)
        if palette_path.exists():
            palette_override = load_tailwind_palette(palette_path)
            print(f"Loaded custom palette from {palette_path}")

    run_audit(root, output_path, args.threshold, args.check_implicit)


if __name__ == "__main__":
    main()
