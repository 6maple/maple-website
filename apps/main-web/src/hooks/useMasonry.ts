import { onBeforeUnmount, onMounted } from 'vue';

const handleMasonryLayout = (
  containerEl: HTMLElement,
  children: HTMLElement[],
  responsiveCols: [number, number][],
  gap: [number, number],
) => {
  const containerWidth = containerEl.clientWidth;
  const childrenData: [HTMLElement, number][] = children.map((item) => {
    return [item, item.offsetHeight];
  });
  const originDisplay = containerEl.style.display;
  containerEl.style.display = 'none';
  let cols = 1;
  for (const [minWidth, targetCols] of responsiveCols) {
    if (containerWidth < minWidth) {
      break;
    }
    cols = targetCols;
  }
  const [gx, gy] = gap;
  const colWidth = (containerWidth - gx * (cols - 1)) / cols;
  const colHeights = new Array(cols).fill(0);
  for (const [i, item] of childrenData.entries()) {
    const [itemEl, itemHeight] = item;
    itemEl.style.position = 'absolute';
    itemEl.style.width = `${colWidth}px`;
    const ci = i % cols; // column index
    itemEl.style.transform = `translate3d(${ci * (colWidth + gx)}px, ${colHeights[ci]}px, 0)`;
    colHeights[ci] += itemHeight + gy;
  }
  const totalHeight = Math.max(...colHeights, gy) - gy;
  containerEl.style.height = `${totalHeight}px`;
  containerEl.style.display = originDisplay;
};

export const useMasonry = (
  elGetter: () => HTMLElement,
  childrenGetter: () => HTMLElement[],
  responsiveCols: [number, number][] = [
    [0, 1],
    [768, 2],
    [1280, 3],
  ],
  gap: [number, number] = [16, 16],
) => {
  let doLayout: () => void = () => {};
  onMounted(() => {
    const containerEl = elGetter();
    const children = childrenGetter();
    doLayout = handleMasonryLayout.bind(
      null,
      containerEl,
      children,
      responsiveCols,
      gap,
    );
    doLayout();
    window.addEventListener('resize', doLayout);
  });
  onBeforeUnmount(() => {
    if (doLayout) {
      window.removeEventListener('resize', doLayout);
    }
  });
  const forceLayout = () => {
    doLayout();
  };
  return { forceLayout };
};
