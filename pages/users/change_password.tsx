import { Button, TextInput } from "@carbon/react";
import MasterLayout from "src/layout/MasterLayout";

export default function UserChangePasswordPage() {
  return (
    <MasterLayout>
      <h3>Change Password</h3>

      <div className="mt-4" style={{ maxWidth: 300 }}>
        <TextInput
          autoFocus
          id="old_password"
          labelText="Old Password"
          type="password"
          className="mb-1"
          placeholder="Your old password"
        />
        <TextInput
          id="new_password"
          labelText="New Password"
          type="password"
          className="mb-1"
          placeholder="Your new password"
        />
        <TextInput
          id="confim_new_password"
          labelText="Confirmed New Password"
          type="password"
          className="mb-3"
          placeholder="Your new password again"
        />

        <Button>Change Password</Button>
      </div>
    </MasterLayout>
  );
}
