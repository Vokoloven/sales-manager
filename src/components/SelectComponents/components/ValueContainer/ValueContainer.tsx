import classnames from 'classnames';
import { isValidElement } from 'react';
import { components } from 'react-select';
import { typedMemo } from '@/core/utils/typedMemo.util';
import { useValueContainer } from './hooks/useValueContainer';
import type { TValueContainer } from './models/valueContainer.models';
import styles from './ValueContainer.module.css';

const ValueContainer = <T,>(props: TValueContainer<T>) => {
  const { children, selectProps, ...rest } = props;
  const { containerRef, badgeRef, hiddenCount, hiddenTooltip, chips, input } =
    useValueContainer(children);

  const shouldShowChips = !selectProps.inputValue;

  return (
    <components.ValueContainer selectProps={selectProps} {...rest}>
      <div
        ref={containerRef}
        className={classnames(styles.container, 'react-select__value-sub-container')}
      >
        {shouldShowChips && (
          <>
            {chips.map((chip) => {
              if (!isValidElement(chip)) return null;

              return (
                <div
                  key={chip.key}
                  data-chip
                  className={classnames(styles.item, 'react-select__chip-item')}
                >
                  {chip}
                </div>
              );
            })}

            {hiddenCount > 0 && (
              <div
                ref={badgeRef}
                className={classnames(styles.hiddenCount, 'react-select__hidden-count')}
              >
                <span title={hiddenTooltip}>+{hiddenCount}</span>
              </div>
            )}
          </>
        )}
        {input}
      </div>
    </components.ValueContainer>
  );
};

export default typedMemo(ValueContainer);
