# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

描述：针对长表格滚动条的吸底方案（antd4.6发布的一版sticky功能之另外一个解法）


效果预览
<https://yaya1286249672.github.io/antd-table-scrollbar-fixed/>

使用案例

```bash
import { useRef } from 'react';
import styles from './index.less';
import { Table } from 'antd';
import useCustomFixScrollBar from './custom-scroll-bar';
export default function IndexPage() {
  const data = Array.from({ length: 600 }, (_, key) => ({ key }));
  const columns = [
    { title: 'A', dataIndex: 'key', width: 600, fixed: 'left' },
    { title: 'B', dataIndex: 'key', width: 600 },
    { title: 'C', dataIndex: 'key', width: 600 },
    { title: 'D', dataIndex: 'key', width: 600 },
    { title: 'E', dataIndex: 'key', width: 600 },
    { title: 'F', dataIndex: 'key', width: 600 },
  ];
  const tableRef = useRef(null);
  const CustomFixScrollBar = useCustomFixScrollBar(tableRef as any);

  return (
    <div>
      <Table
        sticky
        columns={columns as any}
        dataSource={data}
        scroll={{ x: 'max-content' }}
        ref={tableRef}
        style={{
          marginLeft: 200,
        }}
      />
      {CustomFixScrollBar}
    </div>
  );
}
```
