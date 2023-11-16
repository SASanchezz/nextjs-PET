import { CategoryType } from "src/types/Category";
import { useState } from "react";
import {CSS} from '@dnd-kit/utilities';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  useDndContext,
  MeasuringStrategy,
  DropAnimation,
  defaultDropAnimationSideEffects,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { MeasuringConfiguration } from "src/types/DndTypes";
import SortableCategory from "./sortable-category";
import classNames from 'classnames';
import styles from '../dnd-css/Categories.module.css';
import categoryStyles from '../dnd-css/Category.module.css';
import { Category } from "./category";
import { Position } from "src/types/Position";
import { isKeyboardEvent } from "src/utils/utilities";

export default function Categories(props: any) {
  const { onToggle, onDelete, onTextChange, items, setItems, setChangesExists, ...otherProps } = props
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const activeIndex = activeId ? items.map((item: CategoryType) => item.id).indexOf(Number(activeId)) : -1;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
  );

  const measuring: MeasuringConfiguration = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }
  
  function handleDragCancel() {
    setActiveId(null);
  }

  function handleDragEnd(event: any) {
    const over = event.over
    if (over) {
      let overIndex = items.map((item: CategoryType) => item.id).indexOf(Number(over.id));
      overIndex = overIndex === items.length - 1 ? overIndex - 1 : overIndex;

    if (activeIndex !== overIndex) {
        setItems((items: CategoryType[]) => arrayMove(items, activeIndex, overIndex));
      }
    }

    setChangesExists(true);
    setActiveId(null);
  }

  const dropAnimation: DropAnimation = {
    keyframes({transform}) {
      return [
        {transform: CSS.Transform.toString(transform.initial)},
        {
          transform: CSS.Transform.toString({
            scaleX: 0.98,
            scaleY: 0.98,
            x: transform.final.x - 10,
            y: transform.final.y - 10,
          }),
        },
      ];
    },
    sideEffects: defaultDropAnimationSideEffects({
      className: {
        active: categoryStyles.active,
      },
    }),
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}>
    
      <SortableContext items={items}>
        <ul className={classNames('category-list', styles.Categories, styles['vertical'])} >
        {items.map((category: CategoryType, index: number) => (
            <SortableCategory
              key={category.id}
              id={category.id}
              index={index + 1}
              activeIndex={activeIndex}
              onDelete={() => onDelete(category.id)}
              onToggle={() => onToggle(category.id)}
              onTextChange={onTextChange(category.id)}
              category={category}
              {...otherProps}
            />
          ))}
        </ul>
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeId ? (
          <CategoryOverlay id={activeId} layout={'vertical'} items={items}/>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

function CategoryOverlay({
  id,
  items,
  ...props
}: Omit<any, 'index'> & {items: CategoryType[]}) {
  const {activatorEvent, over} = useDndContext();
  const isKeyboardSorting = isKeyboardEvent(activatorEvent);
  const activeIndex = items.map((item) => item.id).indexOf(Number(id));
  let overIndex = over?.id ? items.map((item) => item.id).indexOf(Number(over.id)) : -1;
  overIndex = overIndex === items.length - 1 ? overIndex - 1 : overIndex;
  return (
    <Category
      id={id}
      {...props}
      clone
      insertPosition={
        isKeyboardSorting && overIndex !== activeIndex
          ? overIndex > activeIndex
            ? Position.After
            : Position.Before
          : undefined
      }
      category={items[activeIndex]}
    />
  );
}
