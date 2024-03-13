import React from "react";
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";

const KanbanListing = ({items, onDragStop}) => {
  const [kanbanData, setData] = React.useState([]);

  React.useEffect(() => {
    let data = [];

    items.map((item) => {
      return data.push(
        {
          Id: item.application.id,
          Title: 'Email : ' + item.application.email,
          Status: item.application.status,
          Summary: 'Nom : ' + item.application.name,
          Priority: 'Low',
          Tags: item.post.name
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
        tagsField: 'Tags'
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