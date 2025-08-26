import { Input } from "@/components/input/Input";
import styles from "./details-form.module.scss";
import {
  BusinessEntity,
  CompanyType,
  type Company,
} from "@/stores/organizations-store";
import { Select } from "@/components/select/Select";
import { formatCompanyType } from "@/utils";
import { Form } from "@/components/form/Form";
import { FormItem } from "@/components/form/FormItem";

interface FormProps {
  values: Company;
  onChange: (value: Company) => void;
}

export function OrganizationDetailsForm({
  values,
  onChange: handleChange,
}: FormProps) {
  return (
    <Form>
      <div className={styles.form__agreement}>
        <FormItem label="Agreement number">
          <Input
            value={values.contract.no}
            onChange={(e) =>
              handleChange({
                ...values,
                contract: {
                  ...values.contract,
                  no: e.target.value,
                },
              })
            }
          />
        </FormItem>
        <FormItem label="Date">
          <Input
            type="date"
            value={
              new Date(values.contract.issue_date).toISOString().split("T")[0]
            }
            onChange={(e) =>
              handleChange({
                ...values,
                contract: {
                  ...values.contract,
                  issue_date: new Date(e.target.value).toISOString(),
                },
              })
            }
          />
        </FormItem>
      </div>
      <FormItem label="Buisness entity">
        <Select
          classNameInput={styles.form__select}
          options={Object.values(BusinessEntity).map((value) => ({
            label: value,
            value,
          }))}
          value={values.businessEntity}
          onChange={(v) => {
            if (Array.isArray(v)) return;
            handleChange({
              ...values,
              businessEntity: v as Company["businessEntity"],
            });
          }}
        />
      </FormItem>
      <FormItem label="Company type">
        <Select
          multiple
          classNameInput={styles.form__select}
          options={Object.values(CompanyType).map((value) => ({
            label: formatCompanyType(value),
            value,
          }))}
          value={values.type}
          onChange={(v) => {
            if (!Array.isArray(v)) return;
            handleChange({ ...values, type: v as Company["type"] });
          }}
        />
      </FormItem>
    </Form>
  );
}
