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
        {t("newCategoryModal.header")}
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
          label={t("newCategoryModal.form.title")}
          name="title"
          placeholder={t("newCategoryModal.form.placeholder")}
        />
      </Body>
      <Footer className="space-x-2">
        <ActionBlock
          className="flex gap-2"
          cancelButtonProps={{
            label: t("newCategoryModal.form.cancel"),
            onClick: onClose,
            disabled: false,
          }}
          submitButtonProps={{
            label: t("newCategoryModal.form.add"),
            disabled: isLoading,
            loading: isLoading,
          }}
        />
      </Footer>
    </NeetoUIForm>
  </Modal>
);

export default withT(AddModal);
