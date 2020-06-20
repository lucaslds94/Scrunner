import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import MenuLateral from "../../components/MenuLateral";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Tooltip from "../../components/ToolTip";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";

import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../utils/localStorage";

import { toast, ToastContainer } from "react-toastify";

import "./styles.css";

const Profile = () => {
  const user = getLocalStorage("@Scrunner:user");

  const [selectedFileUrl, setSelectedFileUrl] = useState(user.image_url || "");
  const [imageFile, setImageFile] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || "",
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (event, name) => {
    const { value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const onDrop = useCallback((acceptedFiles) => {
    if(!!acceptedFiles.length) {
      const [file] = acceptedFiles;
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      setImageFile(file);
    }
    else {
      toast.error("Arquivo inválido")
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="profile">
      <Header />
      <MenuLateral isProfile={true} />
      <Container>
        <div className="profile-container">
          <div className="profile-picture">
            <div className="profile-dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <img src={selectedFileUrl} alt={user.name} />
              <div className="picture-info"></div>
                <div className="picture-camera">
              <Tooltip width={"200px"} title="Arraste sua foto para cá ou clique para selecionar uma imagem do computador.">
                  <FiCamera size={22} color="#737ff3" />
              </Tooltip>
                </div>
            </div>
            <h3>Olá, {user.name}</h3>
          </div>

          <div className="profile-divider" />

          <div className="profile-input-container">
            <h4> Altere suas informações </h4>
            <div className="profile-input">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>
            <div className="profile-input">
              <label htmlFor="currrentPassword">Senha atual</label>
              <input
                id="currrentPassword"
                name="currrentPassword"
                type={showCurrentPass ? "text" : "password"}
                onChange={(e) => handleInputChange(e, "oldPassword")}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
              >
                {showCurrentPass && <FaEyeSlash size={20} color={"#737FF3"} />}
                {!showCurrentPass && <FaEye size={20} color={"#c3c3c3"} />}
              </button>
            </div>
            <div className="profile-input">
              <label htmlFor="newPassword">Nova senha</label>
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPass ? "text" : "password"}
                onChange={(e) => handleInputChange(e, "password")}
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
              >
                {showNewPass && <FaEyeSlash size={20} color={"#737FF3"} />}
                {!showNewPass && <FaEye size={20} color={"#c3c3c3"} />}
              </button>
            </div>
            <div className="profile-input">
              <label htmlFor="confirmNewPassword">Confirme a nova senha</label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type={showConfirmPass ? "text" : "password"}
                onChange={(e) => handleInputChange(e, "confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass && <FaEyeSlash size={20} color={"#737FF3"} />}
                {!showConfirmPass && <FaEye size={20} color={"#c3c3c3"} />}
              </button>
            </div>
            <button
              onClick={() => console.log("oi")}
              className="button-save-info"
            >
              Salvar
            </button>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Profile;
