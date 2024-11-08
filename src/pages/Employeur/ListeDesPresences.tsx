import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Select,
  Modal,
  Input,
  Switch,
  TimePicker,
} from "antd";
import {
  AppstoreAddOutlined,
  ClearOutlined,
  SearchOutlined,
  
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import templatedata from "../../data/Pointage.json";
import Card from "antd/es/card/Card";
import moment from "moment";

interface ListePresenceinterface {
  name:string;
  employeeId: number;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  totalHours: number | null;
  isAbsent: boolean; 
  overtimeHours: null,
  breakMinutes: null,
  shiftType: string,
  location: string,
  isRemote: boolean,
  deviceId: null,
  isLate: boolean,
  remarks: string
}

const ListePresence: React.FC = () => {
  const [dataSource, setDataSource] = useState<ListePresenceinterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState<ListePresenceinterface>({
  name:"",
  employeeId: 0,
  date: "",
  checkInTime: "",
  checkOutTime:"",
  totalHours:0,
  isAbsent: false,
  overtimeHours: null,
  breakMinutes: null,
  shiftType: "",
  location: "",
  isRemote: false,
  deviceId: null,
  isLate: false,
  remarks: ""
  });
  const [filters, setFilters] = useState({
    name:"",
    employeeId: 0,
    date: "",
    checkInTime: "",
    checkOutTime:"",
    totalHours:0,
    isAbsent: false,
    overtimeHours: null,
    breakMinutes: null,
    shiftType: "",
    location: "",
    isRemote: false,
    deviceId: null,
    isLate: false,
    remarks: ""
  });

  useEffect(() => {
    // Initialize the data with keys
    const dataWithKeys = templatedata.map((leave) => ({
      ...leave,
      key: leave.employeeId,
    }));
    setDataSource(dataWithKeys);
  }, []);



  const columns = [
    {
      title: "Id",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Nom",
      dataIndex: "name",
      key: "Name",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      
    },
    {
      title: "checkInTime",
      dataIndex: "checkInTime",
      key: "checkInTime",
      
    },
    {
      title: "checkOutTime",
      dataIndex: "checkOutTime",
      key: "checkOutTime",
      
    },
    {
      title: "totalHours",
      dataIndex: "totalHours",
      key: "totalHours",
      
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      
    },
    {
      title: "Presence",
      dataIndex: "isAbsent",
      key: "isAbsent",
      render: (isAbsent: boolean) => {
        return (
          <span style={isAbsent===false  ?{ color:  "green" }:{ color:  "red" }}>
            {isAbsent===false ?"Present": "Abscent"}
          </span>
        );
      },
    },
    {
      title: "isRemote",
      dataIndex: "isRemote",
      key: "isRemote",
      render: (isRomote: boolean) => {
        return (
          <span style={isRomote===false  ?{ color:  "green" }:{ color:  "blue" }}>
            {isRomote===false ?"": "Romote"}
          </span>
        );
      },
    },
    {
      title: "Late",
      dataIndex: "isLate",
      key: "isLate",
      render: (isLate: boolean) => {
        return (
          <span style={isLate===true  ?{ color:  "red" }:{ color:  "blue" }}>
            {isLate===true ?"Is Late ": ""}
          </span>
        );
      },
    },
    
    

   
  ];

  // Filter the data based on search inputs
  const handleSearch = () => {
    const filteredData = templatedata
      .map((leave) => ({
        ...leave,
        key: leave.employeeId,
      }))
      .filter((leave) => {
        const matchName = !filters.name || leave.name.includes(filters.name);
        const matchIsAbsent = !filters.isAbsent || leave.isAbsent === filters.isAbsent;
        const matchIsRemote = !filters.isRemote || leave.isRemote===filters.isRemote;
        const matchIsLate = !filters.isLate || leave.isLate===filters.isLate;
        const matchLocation = !filters.location || leave.location===filters.location;
        const matchCheckInTime =
          !filters.checkInTime ||
          (leave.checkInTime &&
            moment(leave.checkInTime, "HH:mm").isSame(
              moment(filters.checkInTime, "HH:mm"),
              "minute"
            ));
            const checkOutTime =
          !filters.checkOutTime ||
          (leave.checkOutTime &&
            moment(leave.checkOutTime, "HH:mm").isSame(
              moment(filters.checkOutTime, "HH:mm"),
              "minute"
            ));
      return (
          matchName &&
          matchIsAbsent &&
          matchIsRemote&&
          matchIsLate&&
          matchLocation&&
          matchCheckInTime&&
          checkOutTime
         
        );
      });
    setDataSource(filteredData);
  };

  // Clear filters and reset table
  const handleClearFilters = () => {
    setFilters({
      name:"",
      employeeId: 0,
      date: "",
      checkInTime: "",
      checkOutTime:"",
      totalHours:0,
      isAbsent: false,
      overtimeHours: null,
      breakMinutes: null,
      shiftType: "",
      location: "",
      isRemote: false,
      deviceId: null,
      isLate: false,
      remarks: ""
    });
    setDataSource(
      templatedata.map((leave) => ({ ...leave, key: leave.employeeId }))
    );
  };

  // Open modal to add new entry
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle form submission in the modal
  const handleAddEntry = () => {
    const newData = {
      ...newEntry,
      id: dataSource.length + 1,
      key: (dataSource.length + 1).toString(),
      reference: `Ref00${(dataSource.length+1).toString()}`,

    };
    setDataSource([newData, ...dataSource]); // Add new entry to data source
    setIsModalVisible(false); // Close the modal
    setNewEntry({
      name:"",
      employeeId: 0,
      date: "",
      checkInTime: "",
      checkOutTime:"",
      totalHours:0,
      isAbsent: false,
      overtimeHours: null,
      breakMinutes: null,
      shiftType: "",
      location: "",
      isRemote: false,
      deviceId: null,
      isLate: false,
      remarks: ""
    }); // Reset form data
  };

  return (
    <>
      <Card>
        <Form layout="horizontal" initialValues={{ size: "default" }}>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: "#214f87" }}>
              Liste de présence des employers
              </Title>
            </Col>

            <Col xs={12} md={5}>
              <Form.Item label="Nom">
                <Input
                  value={filters.name}
                  onChange={(e) =>
                    setFilters({ ...filters, name: e.target.value })
                  }
                  placeholder="Chercher par référence"
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="location">
                <Input
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  placeholder="Chercher par localisation"
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={2}>
              <Form.Item label="isAbsent">
              <Switch size="small" checked={filters.isAbsent}
                  onChange={(checked) =>
                    setFilters({ ...filters, isAbsent: checked })
                  }/>
              </Form.Item>
            </Col>
            <Col xs={12} md={2}>
              <Form.Item label="isRemote">
              <Switch size="small" checked={filters.isRemote}
                  onChange={(checked) =>
                    setFilters({ ...filters, isRemote: checked })
                  }/>
              </Form.Item>
            </Col>
            <Col xs={12} md={2}>
              <Form.Item label="isLate">
              <Switch size="small" checked={filters.isLate}
                  onChange={(checked) =>
                    setFilters({ ...filters, isLate: checked })
                  }/>
              </Form.Item>
            </Col>
           
           
           
            <Col xs={24} md={8}>
            <Button type="primary"  onClick={showModal} style={{backgroundColor:'#79ba8a',marginRight:20,float:'right'}}>
            <AppstoreAddOutlined /> Add
            </Button>
              <Button
                type="primary"
                onClick={handleSearch}
                style={{
                  backgroundColor: "#6195d4"
                 ,marginRight:20,float:'right',marginLeft:20,
                }}
              >
                <SearchOutlined /> Recherche
              </Button>
              <Button
                type="default"
                onClick={handleClearFilters}
                style={{
                  backgroundColor: "orange",marginRight:20,float:'right'
                }}
              >
                <ClearOutlined /> Clear
              </Button>
             
            
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="checkInTime">
              <TimePicker
                  format="HH:mm"
                  style={{ width: "100%" }}
                  onChange={(time) =>
                    setFilters({
                      ...filters,
                      checkInTime: time ? time.format("HH:mm") : "",
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="checkOutTime">
              <TimePicker
                  format="HH:mm"
                  style={{ width: "100%" }}
                  onChange={(time) =>
                    setFilters({
                      ...filters,
                      checkOutTime: time ? time.format("HH:mm") : "",
                    })
                  }
                />
              </Form.Item>
            </Col>
            
            
            
           

          
          


          

           
          </Row>
        </Form>
      </Card>

      <Card>
        <Table dataSource={dataSource} columns={columns} />

        <Modal
          title="Ajouter un Congé"
          visible={isModalVisible}
          onOk={handleAddEntry}
          onCancel={() => setIsModalVisible(false)}
          okText="Ajouter"
          cancelText="Annuler"
        >
          <Form layout="vertical">
          

            <Form.Item label="Nom">
              <Input
                value={newEntry.name}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, name: e.target.value })
                }
              />
            </Form.Item>

          
           

           

            <Form.Item label="remarks">
              <Select
                value={newEntry.remarks}
                onChange={(value) =>
                  setNewEntry({ ...newEntry, remarks: value })
                }
              >
                <Select.Option value="Ok">Accepter</Select.Option>
                <Select.Option value="EnCours">
                  En Cours de traiter
                </Select.Option>
                <Select.Option value="Ref">Refusé</Select.Option>
                <Select.Option value="Nonjustifier">
                  Non justifier
                </Select.Option>
              </Select>
            </Form.Item>

        
          </Form>
        </Modal>
      
      </Card>
    </>
  );
};

export default ListePresence;
