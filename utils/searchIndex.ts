
import { ModuleType } from '../types';

export interface SearchItem {
  module: ModuleType;
  tab?: string;
  title: string;
  desc: string;
  keywords: string;
}

export const FULL_SEARCH_INDEX: SearchItem[] = [
  // Optics
  { module: ModuleType.GEOMETRIC_OPTICS, title: "几何光学基础", desc: "焦距、物距、像距、实像与虚像、放大倍率。", keywords: "geometric optics focal length object image distance virtual real magnification lens formula 几何 光学 焦距" },
  { module: ModuleType.ZOOM_SYSTEM, title: "变焦系统结构", desc: "内变焦 vs 外变焦、呼吸效应补偿、变焦凸轮。", keywords: "zoom system lens internal external breathing focus shift par-focal varifocal cam mechanism 变焦 呼吸效应" },
  { module: ModuleType.OPTICAL_FILTERS, title: "光学滤镜 (ND/CPL/Mist)", desc: "物理滤镜效果：偏振镜消反光、ND减光、黑柔光晕。", keywords: "optical filters nd neutral density cpl polarizer mist diffusion bloom pro-mist 滤镜 减光 偏振 柔光" },
  
  // Lens Advanced
  { module: ModuleType.LENS_ADVANCED, tab: 'MTF_LAB', title: "MTF 曲线实验室", desc: "解读反差与分辨率曲线，径向/切向(S/M)含义。", keywords: "mtf chart modulation transfer function contrast resolution sharpness curve sagittal meridional 曲线 反差 分辨率" },
  { module: ModuleType.LENS_ADVANCED, tab: 'DIFFRACTION', title: "衍射极限 (Diffraction)", desc: "小光圈画质下降原理，艾里斑大小与光圈的关系。", keywords: "diffraction limit airy disk small aperture f22 sharpness physics 衍射 艾里斑 光圈" },
  { module: ModuleType.LENS_ADVANCED, tab: 'ASPHERICAL', title: "非球面镜片 (Aspherical)", desc: "球差校正原理，XA 镜片与洋葱圈焦外。", keywords: "aspherical lens spherical aberration xa element correction onion ring bokeh 非球面 球差 焦外" },
  { module: ModuleType.LENS_ADVANCED, tab: 'COATING', title: "镀膜技术 (Coating)", desc: "鬼影、眩光成因，纳米 AR 镀膜原理。", keywords: "lens coating nano ar flare ghosting transmission reflection 镀膜 鬼影 眩光" },
  { module: ModuleType.LENS_ADVANCED, tab: 'ABERRATIONS', title: "光学像差 (Aberrations)", desc: "色散(紫边)、暗角、慧差(星空拖尾)。", keywords: "chromatic aberration ca purple fringing vignetting coma astigmatism correction 像差 色散 暗角" },
  { module: ModuleType.LENS_ADVANCED, tab: 'CINE_VS_PHOTO', title: "电影头 vs 摄影头", desc: "T值透光率、无级光圈、对焦行程、呼吸效应。", keywords: "cine lens photo lens t-stop f-stop breathing focus throw gear rings clickless 电影镜头 摄影镜头" },

  // Mechanics
  { module: ModuleType.MECHANICS, tab: 'FOCUS', title: "对焦马达 (Motor)", desc: "STM 步进、USM 超声波、Linear 线性马达对比。", keywords: "focus motor stm usm linear xd stepper ultrasonic mechanics speed noise 对焦 马达" },
  { module: ModuleType.MECHANICS, tab: 'ALGORITHM', title: "对焦算法 (AF)", desc: "相位对焦 (PDAF) vs 反差对焦 (CDAF) 原理。", keywords: "autofocus algorithm phase detection contrast detection pdaf cdaf hunting tracking 对焦 算法 相位 反差" },
  { module: ModuleType.MECHANICS, tab: 'STABILIZATION', title: "防抖系统 (Stabilization)", desc: "五轴防抖 (IBIS)、镜身防抖 (OIS)、电子防抖 (EIS)。", keywords: "image stabilization ibis ois eis sensor shift optical electronic gyro active mode 防抖 稳定" },
  { module: ModuleType.MECHANICS, tab: 'FLANGE', title: "法兰距 (Flange)", desc: "法兰距定义，无反转接单反镜头的原理。", keywords: "flange distance focal depth mount adapter mirrorless dslr e-mount ef-mount short flange 法兰距 卡口 转接" },

  // Cinematography
  { module: ModuleType.CINEMATOGRAPHY, tab: 'LIGHTING', title: "布光艺术 (Lighting)", desc: "经典三点布光法，光比控制。", keywords: "cinematography lighting three point key fill back light ratio rembrandt 布光 灯光" },
  { module: ModuleType.CINEMATOGRAPHY, tab: 'INVERSE_SQUARE', title: "平方反比定律", desc: "光照强度随距离衰减的物理规律。", keywords: "inverse square law light falloff distance intensity physics 平方反比 衰减" },
  { module: ModuleType.CINEMATOGRAPHY, tab: 'COMPOSITION', title: "构图法则", desc: "三分法、引导线、对称、留白。", keywords: "composition rule of thirds leading lines symmetry negative space framing 构图 三分法" },
  { module: ModuleType.CINEMATOGRAPHY, tab: 'ANAMORPHIC', title: "变形宽银幕", desc: "2.39:1 画幅，椭圆焦外，横向拉丝。", keywords: "anamorphic lens squeeze ratio bokeh flare widescreen cinematic jj abrams 变形宽银幕 宽画幅" },
  { module: ModuleType.CINEMATOGRAPHY, tab: 'MONITORING', title: "监看辅助", desc: "伪色 (False Color)、斑马纹、峰值对焦。", keywords: "monitoring false color zebra peaking exposure assist waveform ire 监看 伪色 斑马纹" },
  { module: ModuleType.CINEMATOGRAPHY, tab: 'LENS_CHOICE', title: "焦段与透视", desc: "广角夸张 vs 长焦压缩。", keywords: "focal length perspective compression field of view wide telephoto zoom 焦段 透视 压缩" },
  { module: ModuleType.CINEMATOGRAPHY, tab: 'STABILIZER', title: "承托设备", desc: "手持、肩扛、三轴稳定器、滑轨。", keywords: "rigging handheld shoulder rig gimbal stabilizer slider dolly movement 稳定器 滑轨" },
  { module: ModuleType.CINEMATOGRAPHY, tab: 'MOVEMENT', title: "运镜术语", desc: "Dolly, Truck, Pan, Tilt 图解。", keywords: "camera movement dolly truck pan tilt cinematic moves 运镜 推拉" },

  // Sensor
  { module: ModuleType.SENSOR_EXPOSURE, tab: 'EXPOSURE', title: "曝光三要素", desc: "光圈、快门、ISO 互易律。", keywords: "exposure triangle aperture shutter iso sensitivity brightness stop 曝光 光圈 快门" },
  { module: ModuleType.SENSOR_EXPOSURE, tab: 'NATIVE_ISO', title: "双原生 ISO", desc: "Dual Base ISO 原理与信噪比优势。", keywords: "dual native iso base gain sensor dynamic range noise floor snr 双原生 噪点" },
  { module: ModuleType.SENSOR_EXPOSURE, tab: 'GRAY_CARD', title: "18% 灰与测光", desc: "中性灰原理，点测光 vs 全局测光。", keywords: "18% gray card metering middle grey reflectance exposure compensation 测光 灰卡" },
  { module: ModuleType.SENSOR_EXPOSURE, tab: 'ROLLING_SHUTTER', title: "卷帘快门 (Rolling Shutter)", desc: "果冻效应成因，全局快门对比。", keywords: "rolling shutter global shutter jello effect readout speed distortion 卷帘快门 果冻效应 全局快门" },
  { module: ModuleType.SENSOR_EXPOSURE, tab: 'SENSOR_SIZE', title: "画幅与裁切", desc: "全画幅、APS-C、M43 视野对比与裁切系数。", keywords: "sensor size full frame aps-c crop factor super35 m43 format 画幅 裁切" },
  { module: ModuleType.SENSOR_EXPOSURE, tab: 'PASM_MODES', title: "PASM 拍摄模式", desc: "P档、A档(光圈优先)、S档(快门优先)、M档。", keywords: "pasm modes program aperture priority shutter manual exposure shooting modes 模式转盘" },

  // Digital ISP
  { module: ModuleType.DIGITAL_ISP, tab: 'RAW_FORMAT', title: "RAW 格式", desc: "原始数据 vs JPEG，无损后期空间。", keywords: "raw format jpeg arw data signal processing uncompressed 格式 后期" },
  { module: ModuleType.DIGITAL_ISP, tab: 'COLOR_MANAGE', title: "色彩科学 (Color)", desc: "色域 (Rec.709/2020)、Log 曲线、LUT。", keywords: "color science gamut rec709 rec2020 p3 log linear lut oetf gamma 色彩 曲线" },
  { module: ModuleType.DIGITAL_ISP, tab: 'BAYER_DEMO', title: "拜耳阵列", desc: "去马赛克算法，摩尔纹成因，OLPF 低通滤镜。", keywords: "bayer pattern demosaicing moire aliasing olpf low pass filter 拜耳 摩尔纹" },
  { module: ModuleType.DIGITAL_ISP, tab: 'BIT_DEPTH', title: "色彩深度 (Bit Depth)", desc: "8-bit vs 10-bit，色彩断层 (Banding)。", keywords: "bit depth 8-bit 10-bit banding quantization gradients color depth 色深 断层" },
  { module: ModuleType.DIGITAL_ISP, tab: 'SAMPLING', title: "信号采样", desc: "超采样 (Oversampling) vs 跳行采样 (Binning)。", keywords: "sampling oversampling binning line skipping resolution quality downsample 采样 超采" },
  { module: ModuleType.DIGITAL_ISP, tab: 'HDR', title: "HDR & 多帧合成", desc: "高动态范围技术，计算摄影。", keywords: "hdr high dynamic range computational photography multi-frame merging ghosting 多帧合成" },
  { module: ModuleType.DIGITAL_ISP, tab: 'AI_COMP', title: "AI 计算摄影", desc: "AI 降噪与超分辨率。", keywords: "ai artificial intelligence computational photography noise reduction upscaling super resolution 计算摄影" },

  // Video Engineering
  { module: ModuleType.VIDEO_ENGINEERING, tab: 'CODECS', title: "视频编码 (GOP)", desc: "I帧、P帧、B帧，帧内压缩 (All-I) vs 长GOP。", keywords: "video codec compression gop i-frame p-frame b-frame intra inter long-gop 编码 压缩" },
  { module: ModuleType.VIDEO_ENGINEERING, tab: 'FORMATS', title: "封装格式", desc: "ProRes, H.264, H.265 (HEVC) 特性对比。", keywords: "formats prores hevc h264 h265 xavc avc encoding decoding container 格式" },
  { module: ModuleType.VIDEO_ENGINEERING, tab: 'SHUTTER_ANGLE', title: "快门角度", desc: "180度规则，动态模糊与帧率的关系。", keywords: "shutter angle 180 degree rule motion blur cinematic look fps 快门角度 动态模糊" },

  // Post Production
  { module: ModuleType.POST_PRODUCTION, tab: 'GRADING', title: "一级校色 (Primary)", desc: "Lift/Gamma/Gain 色轮操作原理。", keywords: "color grading correction lift gamma gain offset wheels davinci resolve 调色 色轮" },
  { module: ModuleType.POST_PRODUCTION, tab: 'SCOPES', title: "示波器 (Scopes)", desc: "波形图、分量图、矢量图读图。", keywords: "scopes waveform parade vectorscope histogram signal analysis 示波器 波形图" },
  { module: ModuleType.POST_PRODUCTION, tab: 'NODES', title: "节点式调色", desc: "串行节点与并行节点逻辑。", keywords: "node graph flow serial parallel layer pipeline grading 节点" },

  // Audio Loudness
  { module: ModuleType.LOUDNESS_STANDARD, tab: 'UNITS', title: "响度单位", desc: "LUFS, dBTP, K-Weighting 加权。", keywords: "loudness units lufs lkfs dbtp true peak k-weighting audio sound 响度 单位" },
  { module: ModuleType.LOUDNESS_STANDARD, tab: 'STANDARDS', title: "交付标准", desc: "广播 (EBU R128) 与网络 (YouTube -14) 响度规范。", keywords: "loudness standards broadcast web youtube bilibili spotify ebu r128 标准 交付" },
  { module: ModuleType.LOUDNESS_STANDARD, tab: 'WORKFLOW', title: "混音工作流", desc: "对白基准、动态控制、限制器设置。", keywords: "mixing workflow dialogue balance dynamics compression limiter 混音 工作流" },
  { module: ModuleType.LOUDNESS_STANDARD, tab: 'MATH', title: "响度算法原理", desc: "ITU-R BS.1770 公式与 Gating 门限。", keywords: "loudness algorithm math itu bs1770 gating integration rms 算法 原理" },
  { module: ModuleType.LOUDNESS_STANDARD, tab: 'QUALITY', title: "音频质量指标", desc: "相位、声场、EQ、底噪管理。", keywords: "audio quality phase soundstage eq noise floor mixing mastering 质量" },

  // Broadcast
  { module: ModuleType.BROADCAST_STANDARDS, title: "广播制式 (PAL/NTSC)", desc: "50Hz vs 60Hz，帧率选择与灯光频闪。", keywords: "broadcast standards pal ntsc 50hz 60hz frame rate flicker safe shutter 制式 频闪" },

  // Utility Tools (NEW)
  { module: ModuleType.UTILITY_TOOLS, tab: 'DOF', title: "景深计算器 (DoF)", desc: "计算超焦距、前景深、后景深。", keywords: "dof depth of field calculator focus hyperfocal near far limit 景深 计算器" },
  { module: ModuleType.UTILITY_TOOLS, tab: 'TIMELAPSE', title: "延时摄影计算", desc: "计算拍摄时长、间隔时间与成片长度。", keywords: "timelapse calculator interval duration fps clip length 延时 计算" },
  { module: ModuleType.UTILITY_TOOLS, tab: 'ND_CALC', title: "ND/长曝光换算", desc: "计算使用减光镜后的快门速度。", keywords: "nd filter calculator long exposure shutter speed stop neutral density 减光 曝光" },
  { module: ModuleType.UTILITY_TOOLS, tab: 'LOUDNESS', title: "音频响度分析 (Tool)", desc: "在线检测本地音频的 LUFS 和 True Peak。", keywords: "loudness analyzer lufs true peak audio file analysis tool 响度 分析" },

  // Sony System
  { module: ModuleType.SONY_SYSTEM, tab: 'CORE', title: "Sony E 卡口", desc: "法兰距、Exmor 传感器演变。", keywords: "sony alpha e-mount flange exmor sensor stacked bsi 索尼 卡口" },
  { module: ModuleType.SONY_SYSTEM, tab: 'LENS', title: "GM 光学", desc: "XA 极值非球面镜片、ED 低色散镜片。", keywords: "sony gm lens g master xa element ed glass optics 镜头 光学" },
  { module: ModuleType.SONY_SYSTEM, tab: 'VIDEO', title: "XAVC 编码", desc: "S-Log3, XAVC S / HS / S-I 详解。", keywords: "sony video xavc s-log3 s-cinetone recording formats bitrate 编码" },
  { module: ModuleType.SONY_SYSTEM, tab: 'AF_AI', title: "AI 对焦", desc: "AI 主体识别、实时追踪技术。", keywords: "sony af autofocus ai subject recognition tracking realtime 对焦 识别" },
  { module: ModuleType.SONY_SYSTEM, tab: 'MENU', title: "菜单系统", desc: "垂直菜单结构与常用设置。", keywords: "sony menu system ui settings setup shooting 菜单" },
  { module: ModuleType.SONY_SYSTEM, tab: 'MECH', title: "机械防抖", desc: "IBIS 五轴防抖与 Active 增强防抖。", keywords: "sony ibis stabilization active mode gyro 防抖" },

  // Gear Showcase
  { module: ModuleType.GEAR_SHOWCASE, title: "新品: Alpha 1 II", desc: "50MP 堆栈式旗舰，8.5级防抖。", keywords: "sony a1 ii alpha 1 flagship camera stacked sensor 8k 旗舰" },
  { module: ModuleType.GEAR_SHOWCASE, title: "新品: Alpha 7 V", desc: "33MP 全能基准，部分堆栈式。", keywords: "sony a7 v a7m5 hybrid camera standard 全能" },
  { module: ModuleType.GEAR_SHOWCASE, title: "新品: FE 400-800mm", desc: "F6.3-8 超长焦内变焦 G 镜头。", keywords: "sony lens 400-800 telephoto zoom g lens 长焦" },
  { module: ModuleType.GEAR_SHOWCASE, title: "新品: FE 50-150mm F2", desc: "F2.0 恒定超大光圈人像变焦。", keywords: "sony lens 50-150 f2 gm portrait zoom 人像" },
];