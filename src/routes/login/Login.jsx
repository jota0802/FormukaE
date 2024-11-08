import { LoginStyle } from "./LoginStyle";
import { useEffect, useState } from "react";
import myGif from "../../assets/logos/formulae.gif";
import lastFrameImage from "../../assets/logos/last-fomrulae.png";
import logoCompleta from "../../assets/logos/formulae-completo-branco.png";
import googleIcon from "../../assets/logos/google-icon.png"; // Ícone do Google
import facebookIcon from "../../assets/logos/facebook-icon.png"; // Ícone de outra plataforma

const Login = () => {
  // --------------------------< Login >------------------------------------ //

    const [loginData, setLoginData] = useState({
      email: '',
      senha: ''
    });
  
    const handleChange = (e) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      fetch(`http://localhost:8080/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Login realizado com sucesso!");
        } else {
          alert("Login falhou. Verifique suas credenciais.");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro no login.");
      });
    };

  // -------------------------------< GIF >----------------------------//

  const [showGif, setShowGif] = useState(true);
  const [showLastFrame, setShowLastFrame] = useState(false);

  useEffect(() => {
    // Ajuste a duração conforme o tempo do GIF
    const gifDuration = 1180;
    const timer = setTimeout(() => {
      setShowGif(false); // Oculta o GIF
      setShowLastFrame(true); // Exibe o último frame
    }, gifDuration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <LoginStyle>
      <div className="content">
        <div className="gif-container">
            <h1>Bem-Vindo</h1>
          <div className="animation">
            {showGif && (
              <img
                src={myGif}
                className="gif"
                style={{ display: showGif ? "block" : "none" }}
              />
            )}
            {showLastFrame && (
              <img
                src={lastFrameImage}
                className="imagem-final"
                style={{ display: showLastFrame ? "block" : "none" }}
              />
            )}
          </div>
          <div className="social-login">
            <button className="google-button">
              <img src={googleIcon} alt="Google logo" />
              Login com Google
            </button>
            <button className="other-button">
              <img src={facebookIcon} alt="Other platform logo" />
              Login com Facebook
            </button>
          </div>
        </div>
        <form className="form">
          <div className="login">
            <img src={logoCompleta} className="logo" />
            <div className="input-container">
              <label>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Formulae@gmail.com"
                value={loginData.email}
                onChange={handleChange}
                required
              />
              <div className="error-message">Email in incorrect format</div>
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input
                id="password"
                type="password"
                name="senha"
                placeholder="Senha: FormulaE@2024"
                title="Minimum 6 characters at least 1 Alphabet, 1 Number and 1 Symbol"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$"
                value={loginData.senha}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              <div className="error-message">
                Minimum 6 characters, at least 1 Alphabet, 1 Number, and 1
                Symbol
              </div>
            </div>
            <button className="my-form__button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </LoginStyle>
  );
};
export default Login;
