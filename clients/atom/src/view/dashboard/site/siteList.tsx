import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Avatar, Card, Button, Col, Row, message, Popconfirm } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { getSiteList, setSite, ISite, analysisInterface } from '@/services';
import ProCard from '@ant-design/pro-card';
import profileImg from '@/assets/profile.jpeg';
import { useNavigate } from 'react-router';

const { Meta } = Card;

const AddSite = () => {
  const formRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <ModalForm
      title="新建站点"
      formRef={formRef}
      open={modalVisible}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          新建站点
        </Button>
      }
      onVisibleChange={setModalVisible}
      submitter={{
        searchConfig: {
          resetText: '重置',
        },
        resetButtonProps: {
          onClick: () => {
            formRef.current?.resetFields();
          },
        },
      }}
      onFinish={async (values) => {
        setSite({
          apiType: 0,
          type: 0,
          ...values,
        }).then(() => {
          message.success('提交成功');
        });
      }}
    >
      <ProFormText
        width="md"
        name="url"
        label="解析URL"
        placeholder="请输入待解析 URL"
      />

      <ProFormText
        width="md"
        name="name"
        label="站点名称"
        placeholder="请输入解析站点名称"
      />
      <ProFormText
        width="md"
        name="description"
        label="站点名称"
        placeholder="请输入解析站点描述"
      />
    </ModalForm>
  );
};

const EddSite = (props: ISite) => {
  const editRef = useRef<ProFormInstance>();

  const initFrom = () => {
    editRef.current?.setFieldsValue({
      name: props.name,
      url: props.url,
      description: props.description,
    });
  };

  return (
    <ModalForm
      title="编辑站点"
      formRef={editRef}
      onVisibleChange={initFrom}
      trigger={<SettingOutlined key="setting" />}
      onFinish={async (values) => {
        await setSite({
          ...props,
          ...values,
        }).then(() => {
          message.success('提交成功');
        });
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="url"
        label="解析URL"
        placeholder="请输入待解析 URL"
      />

      <ProFormText
        width="md"
        name="name"
        label="站点名称"
        placeholder="请输入解析站点名称"
      />
      <ProFormText
        width="md"
        name="description"
        label="站点名称"
        placeholder="请输入解析站点描述"
      />
    </ModalForm>
  );
};

const analysis = (id: string) => {
  analysisInterface(id).then(() => {
    message.success('接口分析成功');
  });
};

const SiteList = () => {
  const navigate = useNavigate();
  const [siteList, setSiteList] = useState([]);

  useEffect(() => {
    getSiteList().then((data) => {
      setSiteList(data.data);
    });
  }, []);

  return (
    <PageContainer extra={[<AddSite key="addSite" />]}>
      <ProCard>
        <Row gutter={[16, 16]}>
          {siteList.map((site: ISite) => (
            <Col span={8} key={site.id}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    onClick={() => navigate(`/interface/${site.id}`)}
                  />
                }
                actions={[
                  <EddSite {...site} />,
                  <Popconfirm
                    title="此操作将更新所有 API，确定吗?"
                    onConfirm={() => site.id && analysis(site.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <EditOutlined key="edit" />
                  </Popconfirm>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src={profileImg} />}
                  title={site.name}
                  description={site.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </ProCard>
    </PageContainer>
  );
};

export default SiteList;