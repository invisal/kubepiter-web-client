import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  TextInput,
  ModalFooter,
} from "@carbon/react";

export default function LoginLayout() {
  return (
    <ComposedModal open>
      <ModalHeader label="Account Login" title="Login Required" />
      <ModalBody>
        <p style={{ marginBottom: "1rem" }}>
          You are required to login to access further
        </p>
        <TextInput
          id="username"
          data-modal-primary-focus
          labelText="Username"
          placeholder="admin"
          style={{ marginBottom: "1rem" }}
        />

        <TextInput
          id="password"
          type="password"
          data-modal-primary-focus
          labelText="Password"
          placeholder="******"
        />
      </ModalBody>

      <ModalFooter
        primaryButtonText="Login"
        secondaryButtonText="Forget Password"
      />
    </ComposedModal>
  );
}
