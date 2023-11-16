import Image from "next/image";
import { forwardRef } from "react";
import Toggle from "./toggle";
import classNames from 'classnames';
import styles from '../dnd-css/Category.module.css';
import { Position } from "src/types/Position";

export enum Layout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Grid = 'grid',
}

export const Category = forwardRef<HTMLLIElement, any>(function Category(
  {id, category, onToggle, onTextChange, index, active, clone, insertPosition, layout, onDelete, style, ...props},
  ref
) {

  const deleteButton = () => (
    <div onClick={onDelete}>
      <Image src="/delete.svg" width={26} height={26} alt="del" />
    </div>
  )
  const dragButton = () => (
    <Image {...props} src="/drag.svg" width={10} height={15} alt="move" />
  )

  return (
    <li className={classNames(
      styles.Wrapper,
      active && styles.active,
      clone && styles.clone,
      insertPosition === Position.Before && styles.insertBefore,
      insertPosition === Position.After && styles.insertAfter,
      layout === Layout.Horizontal && styles.horizontal,
    )}
    style={style}
    ref={ref}
    >
      <input type="text" className="category-name" onChange={onTextChange} style={{color: category.visibility ? "#FFF" : "#696969"}} value={category.name}/>
      
      <div className="tool-bar">
        <Toggle onClick={onToggle} isOn={category.visibility}/>

        {category.id === 0 ? null : deleteButton()}
        {category.id === 0 ? null : dragButton()}
      </div>
    </li>
  )
});