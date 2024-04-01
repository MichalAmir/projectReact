import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Avatar, Modal, Rate } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import ServiceStore from "./Classes/ServiceObject";
import './showService.css';

const { Meta } = Card;

export const Showservice = observer(() => {
  const serviceList = ServiceStore.getList;

  const showModal = (service) => {
    Modal.info({
      title: 'Service Details',
      content: (
        <div>
          <p>ID: {service.id}</p>
          <p>Name: {service.name}</p>
          <p>Description: {service.description}</p>
          <p>Price: {service.price}</p>
          <p>Duration: {service.duration}</p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {serviceList.map((service, index) => (
        <Card
          key={`${service.id}-${index}`}
          style={{ width: '100%', maxWidth: '400px', marginBottom: '50px', margin: '17px' }}
          cover={<img alt="example" src={service.img} style={{ opacity: 0.9 }} />}
          actions={[
            <Rate disabled defaultValue={service.rating} character={<span style={{ color: '#ffd700' }}>&#9733;</span>} />, // צביעת חלק מהכוכבים בצהוב
          ]}
          onClick={() => showModal(service)}
        >
          <Meta
            avatar={<Avatar src={service.img} />} // שימוש בתמונה (img) כאווטר
            title={service.name} // שימוש בשם השירות (name) ככותרת
            description={service.description} // הוספת התיאור של השירות (description) כתוכן של התיאור בכרטיס
          />
        </Card>
      ))}
    </div>
  );
});

export default Showservice;



