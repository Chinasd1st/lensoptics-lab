
import React, { useState, useRef, useMemo } from 'react';
import { QUIZ_DATABASE, QuizQuestion } from '../../utils/quizData';
import { ArrowLeft, Trash2, FileText, Download, Upload, CheckCircle2, GripVertical, Plus, Save, Hash, CornerRightDown, Undo2 } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface QuizBuilderProps {
  onBack: () => void;
}

// Difficulty Styling
const DIFF_COLORS = {
  EASY: 'border-emerald-500/50 bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-100',
  MEDIUM: 'border-cyan-500/50 bg-cyan-100/50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-100',
  HARD: 'border-red-500/50 bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-100',
};

const DIFF_BADGE = {
  EASY: 'bg-emerald-500 dark:bg-emerald-600',
  MEDIUM: 'bg-cyan-500 dark:bg-cyan-600',
  HARD: 'bg-red-500 dark:bg-red-600',
};

interface PaperItemData {
  id: string; 
  question: QuizQuestion;
}

// --- Sub-Components ---

const SourceItem = ({ question, isUsed }: { question: QuizQuestion; isUsed: boolean }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `source-${question.id}`,
    data: { type: 'SOURCE', question },
    disabled: isUsed,
  });

  const colorClass = DIFF_COLORS[question.difficulty];

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        group relative p-3 rounded-xl border-2 transition-all select-none
        ${isUsed
          ? 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60'
          : `bg-white dark:bg-slate-800 border-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg cursor-grab active:cursor-grabbing`
        }
        ${isDragging ? 'opacity-30' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2">
          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${colorClass}`}>{question.difficulty}</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{question.type}</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400 flex items-center gap-0.5"><Hash size={9} />{question.id}</span>
      </div>

      <div className={`text-xs font-medium line-clamp-2 ${isUsed ? 'text-slate-500' : 'text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
        {question.question}
      </div>

      {isUsed && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-slate-950/40 backdrop-blur-[0.5px] rounded-xl cursor-not-allowed">
          <span className="text-emerald-600 dark:text-emerald-500 text-[10px] font-bold flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded-full shadow-sm border border-emerald-500/20">
            <CheckCircle2 size={10} /> 已添加
          </span>
        </div>
      )}
    </div>
  );
};

interface SortablePaperItemProps {
  item: PaperItemData;
  index: number;
  onRemove: (idx: number) => void;
  activeDragType: 'SOURCE' | 'PAPER' | null;
  activeOverId: string | null;
}

const SortablePaperItem = ({ item, index, onRemove, activeDragType, activeOverId }: SortablePaperItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: { type: 'PAPER', index, item } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 999 : 'auto',
  };

  // UX: Show insertion indicator line when dragging a Source item over this Paper item
  const isInsertionTarget = activeDragType === 'SOURCE' && activeOverId === item.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 flex gap-3 items-start group shadow-sm hover:shadow-md transition-all relative ${isInsertionTarget ? 'mt-6' : ''}`}
    >
      {/* Insertion Indicator Line (Visual Feedback) */}
      {isInsertionTarget && (
        <div className="absolute -top-4 left-0 right-0 h-0.5 flex items-center justify-center pointer-events-none">
           <div className="w-full h-full bg-cyan-500 shadow-[0_0_8px_cyan]"></div>
           <div className="absolute bg-cyan-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-lg animate-bounce flex items-center gap-1">
              <CornerRightDown size={10} /> 插入此处 (Insert Here)
           </div>
        </div>
      )}

      <div {...attributes} {...listeners} className="text-slate-400 cursor-move hover:text-slate-600 dark:hover:text-slate-300 mt-1 touch-none">
        <GripVertical size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`w-2 h-2 rounded-full ${DIFF_BADGE[item.question.difficulty]}`}></span>
          <span className="text-[10px] text-slate-500 font-mono font-bold">Q{index + 1}.</span>
          <span className="text-[10px] text-slate-400 font-mono">#{item.question.id}</span>
          <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 rounded border border-slate-200 dark:border-slate-700">{item.question.type}</span>
        </div>
        <div className="text-sm text-slate-800 dark:text-slate-200 font-bold mb-2">
          {item.question.question}
        </div>

        {item.question.options && item.question.options.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {item.question.options.map((opt, optIdx) => (
              <div key={optIdx} className="text-[10px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-mono truncate">
                {String.fromCharCode(65 + optIdx)}. {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onRemove(index)}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
        title="移除"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

// Optimized Container with React.memo to prevent re-renders of the entire list during drag
const PaperContainer = React.memo(({ items, itemIds, onRemove, activeDragType, activeOverId }: { items: PaperItemData[]; itemIds: string[]; onRemove: (idx: number) => void; activeDragType: 'SOURCE' | 'PAPER' | null; activeOverId: string | null }) => {
  // Removed main container useDroppable to prevent background drops
  
  // Add explicit footer drop zone for easier appending
  const { setNodeRef: setFooterNodeRef, isOver: isOverFooter } = useDroppable({
    id: 'paper-container-footer',
  });

  return (
    <div 
      className={`flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar min-h-[200px] pb-20 transition-colors duration-200`}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        {items.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 pointer-events-none opacity-50">
            <div className="w-20 h-20 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center mb-4">
              <Plus size={32} />
            </div>
            <p className="text-sm font-bold">试卷是空的</p>
            <p className="text-xs mt-1">从左侧拖拽题目到此处</p>
          </div>
        )}
        
        {items.map((item, index) => (
          <SortablePaperItem 
            key={item.id} 
            item={item} 
            index={index} 
            onRemove={onRemove} 
            activeDragType={activeDragType}
            activeOverId={activeOverId}
          />
        ))}

        {/* Visual Cue for Appending: Shows when dragging a source item */}
        {activeDragType === 'SOURCE' && (
           <div 
              ref={setFooterNodeRef}
              className={`
              mt-2 border-2 border-dashed rounded-xl h-16 flex items-center justify-center transition-all duration-300
              ${isOverFooter ? 'border-cyan-500 bg-cyan-100/10 text-cyan-500 scale-100 opacity-100' : 'border-slate-300 dark:border-slate-700 text-slate-400 scale-95 opacity-50'}
           `}>
              <span className="text-sm font-bold flex items-center gap-2 animate-pulse">
                 <Plus size={16} /> {isOverFooter ? '松手添加 (Drop to Add)' : '拖拽至此 (Drag Here)'}
              </span>
           </div>
        )}
      </SortableContext>
      {/* Spacer to facilitate dropping at the very end */}
      <div className="h-10 w-full" /> 
    </div>
  );
});
PaperContainer.displayName = 'PaperContainer';

// Lightweight overlay component to reduce render cost following the pointer
const DragItemOverlay = ({ type, data }: { type: 'SOURCE' | 'PAPER', data: any }) => {
  if (type === 'SOURCE') {
    return (
        <div className="opacity-90 rotate-3 scale-105 cursor-grabbing w-[320px]">
           <div className="p-3 rounded-xl border-2 bg-slate-800 border-cyan-500 shadow-2xl cursor-grabbing">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-[10px] font-bold text-cyan-400">添加新题目</span>
                 <span className="text-[10px] text-slate-400 font-mono">#{data.question.id}</span>
              </div>
              <div className="text-xs font-medium text-white">{data.question.question}</div>
           </div>
        </div>
    );
  }
  return (
    <div className="opacity-90 rotate-2 scale-105 cursor-grabbing w-full max-w-xl">
       <div className="bg-slate-900 border border-cyan-500 rounded-lg p-3 shadow-2xl cursor-grabbing">
          <div className="text-sm text-white font-bold">{data.item.question.question}</div>
       </div>
    </div>
  );
};

// --- Main Component ---

export const QuizBuilder: React.FC<QuizBuilderProps> = ({ onBack }) => {
  const [sourceList] = useState<QuizQuestion[]>([...QUIZ_DATABASE]);
  const [paperItems, setPaperItems] = useState<PaperItemData[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<{ type: 'SOURCE' | 'PAPER'; data: any } | null>(null);
  const [activeOverId, setActiveOverId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ id: string, msg: string, item: PaperItemData | null, idx: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const usedQuestionIds = useMemo(() => {
    return new Set(paperItems.map(item => item.question.id));
  }, [paperItems]);

  const itemIds = useMemo(() => paperItems.map(i => i.id), [paperItems]);
  const totalScore = paperItems.length * 10;

  // --- DND Handlers ---

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const type = active.data.current?.type;
    if (type === 'SOURCE') {
      setActiveDragItem({ type: 'SOURCE', data: active.data.current });
    } else if (type === 'PAPER') {
      setActiveDragItem({ type: 'PAPER', data: active.data.current });
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    // Track what we are hovering over for custom visual feedback
    setActiveOverId(over ? String(over.id) : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragItem(null);
    setActiveOverId(null);

    if (!over) return;

    // Handle Source -> Paper Drop
    if (active.data.current?.type === 'SOURCE') {
      const question = active.data.current.question as QuizQuestion;
      const newItem: PaperItemData = {
        id: `paper-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        question
      };

      if (over.id === 'paper-container-footer') {
        // Dropped on footer -> Append
        setPaperItems(items => [...items, newItem]);
      } else {
        // Dropped over an existing item -> Insert BEFORE that item
        const overIndex = paperItems.findIndex(i => i.id === over.id);
        if (overIndex !== -1) {
          setPaperItems(items => {
            const newItems = [...items];
            newItems.splice(overIndex, 0, newItem);
            return newItems;
          });
        }
        // If dropped on background (no ID match), do nothing
      }
    } 
    // Handle Paper -> Paper Reorder
    else if (active.data.current?.type === 'PAPER') {
      if (active.id !== over.id) {
        setPaperItems((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  const handleRemoveItem = (index: number) => {
    const removedItem = paperItems[index];
    setPaperItems(prev => prev.filter((_, i) => i !== index));
    
    // Toast logic
    const toastId = Date.now().toString();
    setToast({
        id: toastId,
        msg: `Q${index + 1} 已移除`,
        item: removedItem,
        idx: index
    });
    
    // Auto clear
    setTimeout(() => {
        setToast(prev => (prev && prev.id === toastId ? null : prev));
    }, 4000);
  };

  const handleUndo = () => {
    if (toast && toast.item) {
        setPaperItems(prev => {
            const newArr = [...prev];
            // Safe insert
            const insertIdx = Math.min(toast.idx, newArr.length);
            newArr.splice(insertIdx, 0, toast.item!);
            return newArr;
        });
        setToast(null);
    }
  };

  // --- Import / Export Logic ---

  const handleExportJSON = () => {
    if (paperItems.length === 0) {
      alert("试卷为空，无法导出");
      return;
    }
    const exportData = {
      title: "CineTech Quiz Paper",
      version: "1.0",
      createdAt: new Date().toISOString(),
      questionIds: paperItems.map(p => p.question.id)
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `quiz_export_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.questionIds || !Array.isArray(json.questionIds)) {
          alert("无效的试卷配置文件 (Missing questionIds)");
          return;
        }
        const newItems: PaperItemData[] = [];
        let missingCount = 0;
        json.questionIds.forEach((id: number) => {
          const originalQuestion = QUIZ_DATABASE.find(q => q.id === id);
          if (originalQuestion) {
            newItems.push({
              id: `imported-${Date.now()}-${Math.random()}`,
              question: originalQuestion
            });
          } else {
            missingCount++;
          }
        });
        setPaperItems(newItems);
        if (missingCount > 0) alert(`导入成功，但有 ${missingCount} 道题目在当前题库中未找到。`);
      } catch (err) {
        console.error(err);
        alert("JSON 解析失败，请检查文件格式。");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter}
      onDragStart={handleDragStart} 
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Toast Notification */}
        {toast && (
           <div className="absolute top-20 right-8 z-[100] bg-slate-900 border border-slate-700 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 fade-in duration-300">
              <span className="text-sm text-slate-300">{toast.msg}</span>
              <button 
                 onClick={handleUndo} 
                 className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold text-sm bg-cyan-900/30 px-2 py-1 rounded transition-colors"
              >
                 <Undo2 size={14}/> 撤销 (Undo)
              </button>
           </div>
        )}

        {/* Header */}
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FileText className="text-cyan-600 dark:text-cyan-400" size={20}/> 试卷编辑器 (Quiz Builder)
              </h2>
              <div className="text-[10px] text-slate-500">
                 题目数: <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold mr-3">{paperItems.length}</span>
                 总分: <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{totalScore}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all">
              <Upload size={14} /> 导入配置
            </button>
            <button onClick={handleExportJSON} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all">
              <Download size={14} /> 导出配置
            </button>
            <button onClick={() => { alert(`试卷已保存！共 ${paperItems.length} 题，总分 ${totalScore}。`); }} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-cyan-900/20 transition-all ml-2">
              <Save size={14} /> 保存并使用
            </button>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left: Source Library */}
          <div className="w-1/3 min-w-[320px] border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-slate-900/50">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">题库列表 (Source)</div>
              <div className="text-[10px] text-slate-400">拖拽题目添加到右侧试卷</div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {sourceList.map((q) => (
                <SourceItem key={q.id} question={q} isUsed={usedQuestionIds.has(q.id)} />
              ))}
            </div>
          </div>

          {/* Right: Paper Construction */}
          <div className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-950 relative">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center shadow-sm z-10">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">试卷预览 (Preview)</div>
              <div className="text-[10px] text-slate-500 flex gap-4">
                 <span>Easy: <span className="text-emerald-500 font-mono">{paperItems.filter(i=>i.question.difficulty==='EASY').length}</span></span>
                 <span>Med: <span className="text-cyan-500 font-mono">{paperItems.filter(i=>i.question.difficulty==='MEDIUM').length}</span></span>
                 <span>Hard: <span className="text-red-500 font-mono">{paperItems.filter(i=>i.question.difficulty==='HARD').length}</span></span>
              </div>
            </div>

            <PaperContainer 
              items={paperItems} 
              itemIds={itemIds} 
              onRemove={handleRemoveItem} 
              activeDragType={activeDragItem?.type || null}
              activeOverId={activeOverId}
            />
          </div>
        </div>

        {/* Drag Overlay with minimal content */}
        <DragOverlay dropAnimation={null}>
          {activeDragItem ? <DragItemOverlay type={activeDragItem.type} data={activeDragItem.data} /> : null}
        </DragOverlay>

      </div>
    </DndContext>
  );
};
