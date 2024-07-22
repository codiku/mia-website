"use client";

import { createProduct } from "@/app/actions/product/actions";
import { Button } from "@/components/Button/Button";
import { InputSelect } from "@/components/InputSelect/InputSelect";
import { InputText } from "@/components/InputText/InputText";
import { InputPrice } from "@/components/InputTextPrice/InputPrice";
import { InputTextarea } from "@/components/InputTextarea/InputTextarea";
import { api } from "@/configs/ky-config";
import { useServerAction } from "zsa-react";

export default function SandboxPage() {

  const { isPending, execute: createProductMutation, data } = useServerAction(createProduct);
  return (
    <>
      {isPending && <h1>Loading...</h1>}
      {data && <h1>Data: {data.id}</h1>}
      <h1>This is a h1</h1>
      <h2>This is a h2</h2>
      <h3>This is a h3</h3>
      <p>This is a paragraph</p>

      <div className="flex gap-8 w-full mt-4 ">
        <div className="flex flex-col gap-4 w-96">
          <div>
            Text
            <InputText type="text" />
          </div>
          <div>
            Text error
            <InputText type="text" variant="error" />
          </div>
          <div>
            Text success
            <InputText type="text" variant="success" />
          </div>
          <div>
            Textarea
            <InputTextarea />
          </div>
          <div>
            Price
            <InputPrice />
          </div>
          <div>
            Select
            <InputSelect />
          </div>
          <div>
            Select ( variant error)
            <InputSelect variant="error" />
          </div>
          <div>
            Select ( variant success)
            <InputSelect variant="success" />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col">
            Buttons Primary
            <Button onClick={() => api.post("http://localhost:3000/api/product", { json: { name: "Nice" } })}>CALL API (safe)</Button>
          </div>
          <div className="flex flex-col">
            Buttons Secondary
            <Button color="secondary" onClick={() => createProductMutation({ name: "Nice" })}>CALL ACTION (safe)</Button>
          </div>
        </div>
      </div>
    </>
  );
}
