import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureInput = ({ onSignatureChange }) => {
  const sigCanvas = useRef(null);

  const handleClear = () => {
    sigCanvas.current.clear();
    onSignatureChange("");
  };

  const handleSave = () => {
    const signature = sigCanvas.current.toDataURL();
    onSignatureChange(signature);
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{
          width: 500,
          height: 200,
          className: "signatureCanvas",
          style: { border: "2px solid black", margin: "2px" },
        }}
      />
      <button className="" onClick={handleClear}>
        Clear
      </button>
      <button className="" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default SignatureInput;
