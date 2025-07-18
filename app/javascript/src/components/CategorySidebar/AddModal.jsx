import React from "react";

import { Modal, Typography } from "neetoui";
import {
  Form as NeetoUIForm,
  Input as FormikInput,
  ActionBlock,
} from "neetoui/formik";
import withT from "utils/withT";

import {
  NEW_CATEGORY_INITIAL_VALUES,
  NEW_CATEGORY_VALIDATION_SCHEMA,
} from "./constants";

const { Body, Header, Footer } = Modal;

const AddModal = ({ t, isOpen, isLoading, onClose, handleCreateCategory }) => (
  <Modal closeOnOutsideClick={false} {...{ isOpen, onClose }}>
    <Header>
      <Typography id="dialog1Title" style="h2" weight="semibold">
        {t("category.newCategory.header")}
      </Typography>
    </Header>
    <NeetoUIForm
      key={isOpen ? "open" : "closed"}
      formikProps={{
        initialValues: NEW_CATEGORY_INITIAL_VALUES,
        validationSchema: NEW_CATEGORY_VALIDATION_SCHEMA,
        onSubmit: handleCreateCategory,
      }}
    >
      <Body className="space-y-4">
        <FormikInput
          required
          label={t("category.newCategory.title")}
          name="title"
          placeholder={t("category.newCategory.placeholder")}
        />
      </Body>
      <Footer className="space-x-2">
        <ActionBlock
          className="flex gap-2"
          cancelButtonProps={{
            label: t("common.cancel"),
            onClick: onClose,
            disabled: false,
          }}
          submitButtonProps={{
            label: t("common.add"),
            disabled: isLoading,
            loading: isLoading,
          }}
        />
      </Footer>
    </NeetoUIForm>
  </Modal>
);

export default withT(AddModal);
