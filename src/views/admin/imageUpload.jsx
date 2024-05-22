import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@chakra-ui/react";

export default function Image({ url, size, onUpload, previousImage }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setImageUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadImage(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      if (previousImage) {
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        const { error: removeError } = await supabase.storage
          .from("images")
          .remove(previousImage);
        if (uploadError || removeError) {
          throw uploadError;
        }
      } else {
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }
      }

      onUpload(event, filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Image"
          className="File image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}

      <div style={{ width: size, marginTop: "10px" }}>
        <Button colorScheme="teal" variant="solid">
          <label
            style={{ padding: "1.25em" }}
            className="button primary block"
            htmlFor="single"
          >
            {uploading ? "Uploading ..." : "Upload 🖼️"}
          </label>
        </Button>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
