import React from "react";
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";

const KanbanListing = ({items}) => {
  const [kanbanData, setData] = React.useState([]);

  React.useEffect(() => {
    let data = [];

    items.map((item) => {
      data.push(
        {
          Id: 'Email : ' + item.application.email,
          Status: item.application.status,
          Summary: item.post.name,
          Priority: 'Low',
          Tags: 'Candidature',
          Estimate: 3.5,
          RankId: 1
        },
        )
    })

    setData(data);
  }, [items])

  return (
    <KanbanComponent id="kanban" keyField="Status" dataSource={kanbanData} cardSettings={{ contentField: "Summary", headerField: "Id", enableTooltip: true }}>
      <ColumnsDirective>
        <ColumnDirective headerText="En attente" keyField="pending"/>
        <ColumnDirective headerText="A contacter" keyField="contacted"/>
        <ColumnDirective headerText="En entretien" keyField="interviewed"/>
        <ColumnDirective headerText="Rejeté" keyField="rejcted"/>
        <ColumnDirective headerText="Archivé" keyField="archived"/>
      </ColumnsDirective>
    </KanbanComponent>
  )
}

export default KanbanListing;