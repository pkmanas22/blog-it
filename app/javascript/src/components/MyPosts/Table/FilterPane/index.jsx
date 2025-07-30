import React, { useRef, useState } from "react";

import { Filter } from "neetoicons";
import { Button, Pane, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import FilterForm from "./Form";

const { Header, Body, Footer } = Pane;

const FilterPane = () => {
  const [isOpen, setIsOpen] = useState(false);

  const formikRef = useRef(null);

  const { t } = useTranslation();

  const handleFormSubmit = () => {
    // TODO: console.log(data);
  };

  const handleActionSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  const handleActionReset = () => {
    if (formikRef.current) {
      formikRef.current.handleReset();
    }
  };

  return (
    <div className="">
      <Button
        icon={Filter}
        style="text"
        tooltipProps={{ content: t("myPosts.filter"), position: "top" }}
        onClick={() => setIsOpen(true)}
      />
      <Pane {...{ isOpen }} onClose={() => setIsOpen(false)}>
        <Header>
          <Typography style="h2" weight="semibold">
            {t("myPosts.filter")}
          </Typography>
        </Header>
        <Body>
          <FilterForm {...{ formikRef, handleFormSubmit }} />
        </Body>
        <Footer className="flex items-center space-x-2">
          <Button label={t("myPosts.submit")} onClick={handleActionSubmit} />
          <Button
            label={t("myPosts.reset")}
            style="text"
            onClick={handleActionReset}
          />
        </Footer>
      </Pane>
    </div>
  );
};

export default FilterPane;
