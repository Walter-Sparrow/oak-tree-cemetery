import { Input } from "@/components/input/Input";
import styles from "./details-form.module.scss";
import {
  BusinessEntity,
  CompanyType,
  type Company,
} from "@/stores/organizations-store";
import { Select } from "@/components/select/Select";
import { formatCompanyType } from "@/utils";

interface FormProps {
  values: Company;
  onChange: (value: Company) => void;
}

export function OrganizationDetailsForm({
  values,
  onChange: handleChange,
}: FormProps) {
  const handleSingleInput = <K extends keyof Company>(
    prop: K,
    value: Company[K]
  ) => {
    handleChange({
      ...values,
      [prop]: value,
    });
  };

  return (
    <div className={styles.form}>
      <div className={styles.form__agreement}>
        <div className={styles.form__item}>
          <div className={styles.form__label}>Agreement number:</div>
          <Input
            value={values.contract.no}
            onChange={(e) =>
              handleSingleInput("contract", {
                ...values.contract,
                no: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.form__item}>
          <div className={styles.form__label}>Date:</div>
          <Input
            type="date"
            value={
              new Date(values.contract.issue_date).toISOString().split("T")[0]
            }
            onChange={(e) =>
              handleSingleInput("contract", {
                ...values.contract,
                issue_date: new Date(e.target.value).toISOString(),
              })
            }
          />
        </div>
      </div>
      <div className={styles.form__item}>
        <div className={styles.form__label}>Business entity:</div>
        <Select
          classNameInput={styles.form__select}
          options={Object.values(BusinessEntity).map((value) => ({
            label: value,
            value,
          }))}
          value={values.businessEntity}
          onChange={(v) => {
            if (Array.isArray(v)) return;
            handleSingleInput("businessEntity", v as Company["businessEntity"]);
          }}
        />
      </div>
      <div className={styles.form__item}>
        <div className={styles.form__label}>Company type:</div>
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
            handleSingleInput("type", v as Company["type"]);
          }}
        />
      </div>
    </div>
  );
}
