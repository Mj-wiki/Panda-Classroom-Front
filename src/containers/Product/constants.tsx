import { IProduct } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Image, Space } from 'antd';

interface IProps {
  onEditHandler: (id: string) => void
  onCardHandler: (id: string) => void
  onDeleteHandler: (id: string) => void
}

export const getColumns: ({
  onEditHandler,
  onCardHandler,
  onDeleteHandler,
}: IProps) => ProColumns<IProduct, 'text'>[] = ({
  onEditHandler,
  onCardHandler,
  onDeleteHandler,
}) => [
  {
    dataIndex: 'id',
    title: '#',
    valueType: 'indexBorder',
    search: false,
    align: 'center',
    width: 50,
  },
  {
    title: '封面',
    dataIndex: 'coverUrl',
    search: false,
    align: 'center',
    width: 100,
    render: (_, record: IProduct) => <Image src={record.coverUrl} />,
  },
  {
    title: '商品名',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项必填',
        },
      ],
    },
  },
  {
    title: '原价',
    search: false,
    dataIndex: 'originalPrice',
    width: 50,
  },
  {
    title: '优惠价',
    search: false,
    dataIndex: 'preferentialPrice',
    width: 80,
  },
  {
    title: '库存总额',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'stock',
  },
  {
    title: '当前库存',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'curStock',
  },
  {
    title: '每人限购',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'limitBuyNumber',
  },
  {
    title: '销量',
    search: false,
    width: 50,
    align: 'center',
    dataIndex: 'buyNumber',
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 300,
    render: (text, entity) => (
      <Space>
        <Button
          key="edit"
          type="link"
          onClick={() => onEditHandler(entity.id)}
        >
          编辑
        </Button>
        <Button
          key="card"
          type="link"
          onClick={() => onCardHandler(entity.id)}
        >
          绑定消费卡
        </Button>
        <Button
          key="delete"
          danger
          type="link"
          onClick={() => onDeleteHandler(entity.id)}
        >
          删除
        </Button>
      </Space>
    ),
  },
];
