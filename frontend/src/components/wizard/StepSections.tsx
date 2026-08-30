"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SECTION_LIBRARY, getSectionDef } from "@/lib/sections";
import type { SectionInstance } from "@/lib/types";

export function isStepSectionsValid(sections: SectionInstance[]) {
  return sections.length > 0;
}

function SortableRow({
  instance,
  index,
  onRemove,
}: {
  instance: SectionInstance;
  index: number;
  onRemove: () => void;
}) {
  const def = getSectionDef(instance.type);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: instance.id,
  });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={
        "flex items-center gap-3 rounded-xl border bg-white p-3 " +
        (isDragging ? "border-indigo-400 shadow-lg" : "border-neutral-200")
      }
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
        {index + 1}
      </span>
      <span className="text-xl" aria-hidden>
        {def?.icon}
      </span>
      <span className="flex-1 text-sm font-medium text-neutral-800">{def?.label ?? instance.type}</span>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        הסרה
      </button>
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="גרירה לשינוי סדר"
        className="cursor-grab touch-none rounded-md px-2 py-1 text-neutral-400 hover:bg-neutral-100 active:cursor-grabbing"
      >
        ⠿
      </button>
    </li>
  );
}

export default function StepSections({
  sections,
  onChange,
}: {
  sections: SectionInstance[];
  onChange: (sections: SectionInstance[]) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
  );

  const addedTypes = new Set(sections.map((s) => s.type));

  function addSection(type: string) {
    const def = getSectionDef(type);
    if (def?.singleton && addedTypes.has(type)) return;
    onChange([...sections, { id: crypto.randomUUID(), type, fields: {} }]);
  }

  function removeSection(id: string) {
    onChange(sections.filter((s) => s.id !== id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    onChange(arrayMove(sections, oldIndex, newIndex));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">בחירת מקטעים</h2>
        <p className="mt-1 text-sm text-neutral-500">
          הוסיפו את המקטעים שיופיעו באתר, וגררו אותם לסדר הרצוי
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">ספריית מקטעים</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SECTION_LIBRARY.map((def) => {
            const added = addedTypes.has(def.type);
            const locked = def.singleton && added;
            return (
              <button
                key={def.type}
                type="button"
                disabled={locked}
                onClick={() => addSection(def.type)}
                className={
                  "flex touch-manipulation items-start gap-3 rounded-xl border p-4 text-right transition-colors " +
                  (locked
                    ? "cursor-not-allowed border-neutral-200 opacity-60"
                    : "border-neutral-200 hover:border-indigo-300 hover:bg-indigo-50/40")
                }
              >
                <span className="text-2xl" aria-hidden>
                  {def.icon}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="block text-sm font-semibold text-neutral-800">{def.label}</span>
                    {def.recommended && (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-red-500"
                        title="חובה להכניס"
                        aria-label="חובה להכניס"
                      />
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-500">{def.description}</span>
                </span>
                <span
                  className={
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium " +
                    (locked ? "bg-neutral-200 text-neutral-500" : "bg-indigo-600 text-white")
                  }
                >
                  {locked ? "נוסף ✓" : added ? "הוספה נוספת" : "הוספה"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">
          המקטעים שנבחרו {sections.length > 0 && `(${sections.length})`}
        </p>
        {sections.length === 0 ? (
          <p className="rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-400">
            עדיין לא נבחרו מקטעים — לחצו על &quot;הוספה&quot; למעלה
          </p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-2">
                {sections.map((s, i) => (
                  <SortableRow key={s.id} instance={s} index={i} onRemove={() => removeSection(s.id)} />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
