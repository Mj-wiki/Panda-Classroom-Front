import { useRef } from 'react';
import type { UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import {
  Upload,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '@/graphql/oss';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface OSSUploadProps {
  value?: UploadFile;
  onChange?: (file?: UploadFile) => void;
}

const OSSImageUpload = ({ value, onChange }: OSSUploadProps) => {
  const key = useRef('');
  const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO);

  const OSSData = data?.getOSSInfo;

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'removed') {
      onChange?.();
      return;
    }
    const newFile = {
      ...file,
      url: `${OSSData?.host}/${key.current}`,
    };
    onChange?.(newFile);
  };

  const getExtraData: UploadProps['data'] = (file) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    key.current = `${OSSData?.dir}${filename}`;
    return {
      key: key.current,
      OSSAccessKeyId: OSSData?.accessId,
      policy: OSSData?.policy,
      Signature: OSSData?.signature,
    };
  };

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await refetch();
    }
    return file;
  };

  return (
    <ImgCrop rotate>
      <Upload
        name="file"
        listType="picture-card"
        fileList={value ? [value] : []}
        action={OSSData?.host}
        onChange={handleChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
      >
        + 替换头像
      </Upload>
    </ImgCrop>
  );
};
OSSImageUpload.defaultProps = {
  value: null,
  onChange: () => {},
};
export default OSSImageUpload;
