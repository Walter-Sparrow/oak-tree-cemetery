import { Form } from "@/components/form/Form";
import { FormItem } from "@/components/form/FormItem";
import { Input } from "@/components/input/Input";
import type { Contact } from "@/stores/organizations-store";

interface FormProps {
  values: Contact;
  onChange: (value: Contact) => void;
}

export function ContactForm({ values, onChange: handleChange }: FormProps) {
  return (
    <Form>
      <FormItem label="Responsible person">
        <Input
          value={`${values.firstname} ${values.lastname}`}
          onChange={(e) => {
            const [firstname, ...rest] = e.target.value.split(" ");
            handleChange({
              ...values,
              firstname,
              lastname: rest.join(" "),
            });
          }}
        />
      </FormItem>
      <FormItem label="Phone number">
        <Input
          type="tel"
          value={values.phone}
          onChange={(e) => handleChange({ ...values, phone: e.target.value })}
        />
      </FormItem>
      <FormItem label="E-mail">
        <Input
          type="email"
          value={values.email}
          onChange={(e) => handleChange({ ...values, email: e.target.value })}
        />
      </FormItem>
    </Form>
  );
}
