import html2canvas from "html2canvas";

const SavePngScreenBtn = () => {
  const handleCaptureScreen = async () => {
    const body = document.body;

    try {
      const canvas = await html2canvas(body, { scale: 2 });
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "screenshot.png";
      link.click();
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  return (
    <button className="savePngScreenBtn" onClick={handleCaptureScreen}>
      Save As PNG
    </button>
  );
};

export default SavePngScreenBtn;
