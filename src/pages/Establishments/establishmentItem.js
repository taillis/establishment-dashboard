import React, { memo } from "react";
import { Card } from "antd";
import Map from "../../components/map";

const { Meta } = Card;

const EstablishmentItem = ({ establishment, ...props }) => {
  return (
    <Card hoverable style={{ width: 240 }}>
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
      <Meta
        style={{ marginTop: 10 }}
        title={establishment?.name}
        description={establishment?.email}
      />
    </Card>
  );
};

export default memo(EstablishmentItem);
