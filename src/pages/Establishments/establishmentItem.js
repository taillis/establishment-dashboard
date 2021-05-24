import React, { memo } from "react";
import { Card, Typography } from "antd";
import Map from "../../components/map";

const moment = require("moment");

const { Meta } = Card;
const { Text } = Typography;

const EstablishmentItem = ({ establishment, ...props }) => {
  return (
    <Card props={props} hoverable style={{ width: 350, marginTop: 5 }}>
      <div
        style={{
          height: "300px",
          position: "relative",
          margin: "-24px -24px 0",
        }}
      >
        <Map
          initialLocation={{
            lat: establishment?.location?.coordinates[1],
            lng: establishment?.location?.coordinates[0],
          }}
          draggable={false}
          hideText={true}
        />
      </div>
      <Meta style={{ margin: "10px 0" }} title={establishment?.name} />
      <Text>Email de contato: {establishment?.email}</Text>
      <br />
      <Text>
        Distância: {(establishment?.dist.calculated / 1000).toFixed(2) + " Km"}
      </Text>
      <br />
      <Text>
        Entrou em: {moment(establishment?.createdAt).format("DD/MM/YYYY")}
      </Text>
    </Card>
  );
};

export default memo(EstablishmentItem);
