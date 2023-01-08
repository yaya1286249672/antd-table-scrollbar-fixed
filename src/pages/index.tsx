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
        pagination={{ defaultPageSize: 50 }}
        style={{
          // width: 800,
          marginLeft: 200,
        }}
      />
      {CustomFixScrollBar}
    </div>
  );
}
