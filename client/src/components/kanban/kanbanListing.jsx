import React from "react";
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import moment from "moment";
import {Core} from "../../service/core";

const api = new Core();

const KanbanListing = ({items, onDragStop}) => {
  const [kanbanData, setData] = React.useState([]);

  React.useEffect(() => {
    let data = [];

    items.map((item) => {
      return data.push(
        {
          Id: item.application.id,
          Title: item.post.name,
          Status: item.application.status,
          Summary: '<span class="e-icons e-medium e-people"></span> ' + item.application.name +
            '<br/><span class="e-icons e-medium e-send"></span> ' + item.application.email +
            '<br/>' + item.application.phone +
            '<br/><a href="' + api.getServerUrl() + '/uploads/cvs/sample_cv.pdf" download target="_blank"><span class="e-icons e-large e-export-pdf"></span> CV</a>',
          Priority: moment(item.application.createdAt).format('L'),
          Tags: item.post.department.name
        },
      )
    })

    setData(data);
  }, [items])

  return (
    <KanbanComponent
      id="kanban"
      keyField="Status"
      dataSource={kanbanData}
      cardSettings={{
        contentField: "Summary",
        headerField: "Title",
        enableTooltip: true,
        tagsField: 'Tags',
        footerTemplate: 'Priority'
      }}
      dragStop={(e) => onDragStop(e)}
    >
      <ColumnsDirective>
        <ColumnDirective headerText="En attente" keyField="pending"/>
        <ColumnDirective headerText="A contacter" keyField="contacted"/>
        <ColumnDirective headerText="En entretien" keyField="interviewed"/>
        <ColumnDirective headerText="Rejeté" keyField="rejected"/>
        <ColumnDirective headerText="Archivé" keyField="archived"/>
      </ColumnsDirective>
    </KanbanComponent>
  )
}

export default KanbanListing;