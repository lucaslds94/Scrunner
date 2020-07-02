import React, { useEffect, useState } from "react";

import { useParams, useHistory } from "react-router-dom";

import Loading from "../../components/Loading";

import bubbleA from "../../assets/bubbleA.svg";
import bubbleB from "../../assets/bubbleB.svg";
import logo from "../../assets/LogoScrunnerHorizontal.svg";

import validateSuccess from "../../assets/validate_success.svg";
import validateError from "../../assets/validate_error.svg";

import { MdKeyboardBackspace } from "react-icons/md";

import BackButton from "../../components/ButtonAction";

import api from "../../services/api";

import "./styles.css";

const Validate = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorAlreadyActive, setErrorAlreadyActive] = useState(false);
  const [error, setError] = useState(false);

  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    const validateAccount = async () => {
      try {
        await api.put("/user/validate", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSuccess(true);
      } catch (error) {
        if (error?.response?.status === 412) {
          setErrorAlreadyActive(true);
          return;
        }

        setError(true);
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };

    validateAccount();
  }, [token]);

  const handleRedirect = () => {
    history.push("/");
  };

  return (
    <div className="validate-container">
      <img src={bubbleA} className="bolhaAValidate" alt="Bolha A" />
      <img src={bubbleB} className="bolhaBValidate" alt="Bolha B" />

      <div className="validate-content">
        <img src={logo} alt="Scrunner" className="validate-logo" />
        {loading && (
          <>
            <Loading />
            <p className="validate-text">Estamos verificando e ativando sua conta</p>
          </>
        )}

        {!loading && success && (
          <>
            <img className="validate-image" src={validateSuccess} alt="Validate Success" />
            <p>Conta ativada com sucesso.</p>
          </>
        )}

        {!loading && errorAlreadyActive && (
          <>
            <img className="validate-image"  src={validateError} alt="Validate Success" />
            <p>Ops, sua conta já está ativa</p>
          </>
        )}

        {!loading && error && (
          <>
            <img className="validate-image"  src={validateError} alt="Validate Success" />
            <p>Ops, talvez seu link não esteja mais válido</p>
          </>
        )}

        {!loading && (
          <BackButton
            ButtonText="Voltar"
            ButtonIcon={MdKeyboardBackspace}
            size={28}
            onClick={handleRedirect}
          />
        )}
      </div>
    </div>
  );
};

export default Validate;
