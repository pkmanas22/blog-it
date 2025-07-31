import React, { useRef, useState } from "react";

import { filterNonNull } from "neetocist";
import { Filter } from "neetoicons";
import { Button, Pane, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import { FILTER_PANE_FORM_INITIAL_VALUES } from "./constant";
import FilterForm from "./Form";

import { getCategoryNames } from "../utils";

const { Header, Body, Footer } = Pane;

const FilterPane = () => {
  const [isOpen, setIsOpen] = useState(false);

  const formikRef = useRef(null);

  const { t } = useTranslation();
  const history = useHistory();

  const handleFormSubmit = ({ title, categories, status }) => {
    const params = {
      title: title || null,
      status: status?.value,
      category: getCategoryNames(categories),
    };
    history.replace(buildUrl(routes.myPosts, filterNonNull(params)));
    setIsOpen(false);
  };

  const handleActionSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  const handleActionReset = () => {
    if (formikRef.current) {
      formikRef.current.resetForm({ values: FILTER_PANE_FORM_INITIAL_VALUES });
      history.push(routes.myPosts);
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
