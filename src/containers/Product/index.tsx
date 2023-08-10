import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { useDeleteProduct, useEditProductInfo, useProducts } from '@/services/product';
import { IProduct } from '@/utils/types';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getColumns } from './constants';
import EditProduct from './components/EditProduct';
import ConsumeCard from './components/ConsumeCard';

/**
* 当前门店下开设的课程
*/
const Product = () => {
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState('');
  const { refetch, loading } = useProducts();
  const [delHandler, delLoading] = useDeleteProduct();
  const [edit, editLoading] = useEditProductInfo();
  const [showInfo, setShowInfo] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShowInfo(true);
  };

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShowInfo(false);
    if (isReload) {
      actionRef.current?.reload();
    }
  };

  const onCardHandler = (id: string) => {
    setCurId(id);
    setShowCard(true);
  };

  const onDeleteHandler = (id: string) => {
    delHandler(id, () => actionRef.current?.reload());
  };

  const onStatusChangeHandler = (id: string, status: string) => {
    edit(id, {
      status,
    }, () => actionRef.current?.reload());
  };

  return (
    <PageContainer header={{ title: '当前门店下的商品' }}>
      <ProTable<IProduct>
        rowKey="id"
        form={{
          ignoreRules: false,
        }}
        loading={delLoading || editLoading || loading}
        actionRef={actionRef}
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          onCardHandler,
          onDeleteHandler,
          onStatusChangeHandler,
        })}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        toolBarRender={() => [
          <Button key="add" onClick={() => onClickAddHandler()} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
        request={refetch}
      />
      {showInfo && <EditProduct id={curId} onClose={closeAndRefetchHandler} />}
      {showCard && <ConsumeCard id={curId} onClose={() => setShowCard(false)} />}
    </PageContainer>
  );
};

export default Product;
