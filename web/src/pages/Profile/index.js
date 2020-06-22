import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";

import api from "../../services/api";

import MenuLateral from "../../components/MenuLateral";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Tooltip from "../../components/ToolTip";

import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

import { toast, ToastContainer } from "react-toastify";

import "./styles.css";

const Profile = () => {
  const user = getLocalStorage("@Scrunner:user");

  const [selectedFileUrl, setSelectedFileUrl] = useState(user.image_url || "");
  const [imageFile, setImageFile] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [userData, setUserData] = useState({ ...user });

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
    if (!!acceptedFiles.length) {
      const [file] = acceptedFiles;
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      setImageFile(file);
    } else {
      toast.error("Arquivo inválido");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const updateUser = async () => {
    const token = getLocalStorage("@Scrunner:token");

    const userData = new FormData();

    userData.append("name", formData.name);
    userData.append("oldPassword", formData.oldPassword);
    userData.append("password", formData.password);
    userData.append("image", imageFile);

    try {
      const response = await api.put(`/user/update/${user.id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormData({
        ...formData,
        name: response.data.user.name,
        password: "",
        oldPassword: "",
        confirmPassword: "",
      });

      setUserData(response.data.user);
      setSelectedFileUrl(response.data.user.image_url);

      setLocalStorage("@Scrunner:user", response.data.user);
      setLocalStorage("@Scrunner:token", response.data.token);

      toast.success("Informações atualizadas com sucesso");
    } catch (err) {
      if (err?.response.status === 401) {
        return toast.error("Senha atual está incorreta");
      } else {
        return toast.error("Ocorreu um erro inesperado.");
      }
    }
  };

  const handleUpdateUser = () => {
    if (
      formData.name.trim() !== user.name ||
      imageFile ||
      formData.oldPassword.length > 0
    ) {
      if (formData.name.trim().length === 0) {
        toast.error("Insira um nome válido");
        return;
      }

      if (formData.oldPassword.length > 0) {
        if (formData.oldPassword.length < 8) {
          toast.error("A senha precisa de no mínimo 8 caracteres!");
          return;
        }
        if (formData.password.length < 8) {
          toast.error("Sua nova senha precisa de no mínimo 8 caracteres!");
          return;
        }
        if (formData.confirmPassword.length < 8) {
          toast.error("Sua nova senha precisa de no mínimo 8 caracteres!");
          return;
        }

        if (formData.confirmPassword !== formData.password) {
          toast.error(
            "Sua confirmação de senha não corresponde à digitada anteriormente"
          );
          return;
        }
      }

      updateUser();
    }
  };

  return (
    <div className="profile">
      <Header userData={userData} />
      <MenuLateral isProfile={true} />
      <Container>
        <div className="profile-container">
          <div className="profile-picture">
            <div
              className={`profile-dropzone ${
                isDragActive && "profile-dragging"
              }`}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <img src={selectedFileUrl} alt={user.name} />
              <div className="picture-info"></div>
              <div className="picture-camera">
                <Tooltip
                  width={"200px"}
                  title="Arraste sua foto para cá ou clique para selecionar uma imagem do computador."
                >
                  <FiCamera size={22} color="#737ff3" />
                </Tooltip>
              </div>
            </div>
            <h3>Olá, {userData.name}</h3>
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
                tabIndex="-1"
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
                tabIndex="-1"
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
                tabIndex="-1"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass && <FaEyeSlash size={20} color={"#737FF3"} />}
                {!showConfirmPass && <FaEye size={20} color={"#c3c3c3"} />}
              </button>
            </div>
            <button onClick={handleUpdateUser} className="button-save-info">
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
