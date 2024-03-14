import React from "react";
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";

const KanbanListing = ({items, onDragStop}) => {
  const [kanbanData, setData] = React.useState([]);

  React.useEffect(() => {
    let data = [];
    console.log(items)

    items.map((item) => {
      return data.push(
        {
          Id: item.application.id,
          Title: item.post.name,
          Status: item.application.status,
          Summary: '<span class="e-icons e-medium e-people"></span> ' + item.application.name +
            '<br/><span class="e-icons e-medium e-send"></span> ' + item.application.email +
            '<br/>' + item.application.phone +
            '<br/><a href="#"><span class="e-icons e-large e-export-pdf"></span> CV</a>',
          Priority: 'Low',
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