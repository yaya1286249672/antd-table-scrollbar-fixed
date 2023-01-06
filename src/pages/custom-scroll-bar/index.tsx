import { useSize } from 'ahooks';
import { useState, useRef, useEffect } from 'react';
// import { throttle } from 'lodash';

const useCustomFixScrollBar = (tableRef: React.RefObject<HTMLTableElement>) => {
  const [hiddenScroll, setHiddenScroll] = useState(false);
  const [tableLocation, setTableLocation] = useState<DOMRect>();
  const [tableContentWidth, setTableContentWidth] = useState<number>();
  const customScrollBarRef = useRef<HTMLDivElement>(null);
  const size = useSize(tableRef);

  useEffect(() => {
    const targetTable = (tableRef?.current as any).getElementsByClassName(
      'ant-table-body',
    )[0];
    const location = targetTable?.getBoundingClientRect();
    const { bottom } = location;
    setTableContentWidth(targetTable?.scrollWidth);
    setTableLocation(location);
    const oParent = customScrollBarRef.current;
    // //初始化是否需要滚动条
    const viewHeight =
      window.innerHeight || document.documentElement.clientHeight;
    if (bottom < viewHeight) {
      setHiddenScroll(true);
    } else {
      setHiddenScroll(false);
    }
    //table滚动条和自定义滚动条联动
    const handleParentScroll = () => {
      targetTable &&
        targetTable.scrollTo({
          left: oParent?.scrollLeft,
        });
    };
    const handleTableScroll = () => {
      oParent &&
        oParent.scrollTo({
          left: targetTable?.scrollLeft,
        });
    };
    oParent && oParent.addEventListener('scroll', handleParentScroll);
    targetTable && targetTable.addEventListener('scroll', handleTableScroll);
    //是否展示自定义的滚动条 可自动以选择使用throttle这里不装包了就注释掉了
    const handleScroll = () => {
      const viewHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const { bottom } = targetTable?.getBoundingClientRect();
      //1table是否需要有滚动条（table内容超过table宽度） 2是否需要显示自定义滚动条
      if (targetTable?.scrollWidth <= targetTable?.clientWidth) {
        setHiddenScroll(true);
      } else {
        if (bottom < viewHeight) {
          setHiddenScroll(true);
        } else {
          setHiddenScroll(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      oParent && oParent.removeEventListener('scroll', handleParentScroll);
      targetTable &&
        targetTable.removeEventListener('scroll', handleTableScroll);
    };
  }, [size]);

  return (
    <div
      ref={customScrollBarRef}
      style={{
        height: 16,
        width: tableLocation?.width,
        position: 'fixed',
        bottom: 2,
        left: tableLocation?.left,
        display: 'fixed',
        // background: 'rgba(204, 204, 204, 0.1)',
        background: 'red',
        zIndex: 100,
        //控制显示隐藏
        visibility: hiddenScroll ? 'hidden' : 'visible',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          width: tableContentWidth,
          //这里有高度撑开不然
          height: 1,
        }}
      />
    </div>
  );
};

export default useCustomFixScrollBar;
