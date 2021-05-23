import React, { memo } from "react";
import EstablishmentItem from "../Establishments/establishmentItem";

const EstablishmentsList = ({ establishments, ...props }) => {
  return (
    <>
      {establishments.map((establishment) => {
        return (
          <EstablishmentItem
            key={establishment._id}
            establishment={establishment}
          />
        );
      })}
    </>
  );
};

export default memo(EstablishmentsList);
