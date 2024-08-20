import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
  let navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin } = useContext(AuthContext);
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home');
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  // Estilos inline
  const bodyStyle: React.CSSProperties = {
    backgroundColor: '#f9f3f3', // Rosa claro quase branco
    margin: 0, // Remove margens padrão do body
  };

  const fundoLoginStyle: React.CSSProperties = {
    backgroundImage: 'url(../../assets/img/asaswinx.jpg)',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'right',
  };

  const loginContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end', // Alinha o formulário à direita
    alignItems: 'center', // Centraliza verticalmente
    height: '100vh',
    width: '100%',
    padding: 0, // Remove padding se necessário
  };

  const loginFormStyle: React.CSSProperties = {
    backgroundColor: '#fff', // Fundo branco para o formulário
    border: '2px solid #f78da7', // Borda rosa claro
    borderRadius: '12px', // Bordas arredondadas
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra suave
    padding: '20px', // Espaçamento interno
    maxWidth: '400px', // Largura máxima do formulário
    width: '100%', // Largura total do formulário
    marginLeft: '250px', // Ajuste o valor conforme necessário para o espaço à direita
    zIndex: 1, // Garante que o formulário esteja acima da imagem de fundo
  };

  const loginTitleStyle: React.CSSProperties = {
    color: '#d14d72', // Rosa escuro
    backgroundColor: '#d14d72', // Fundo rosa escuro
    borderRadius: '20px', // Bordas arredondadas
    textAlign: 'center',
    padding: '10px',
    fontSize: '2rem',
    marginBottom: '20px',
  };

  const inputGroupStyle: React.CSSProperties = {
    marginBottom: '15px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const loginInputStyle: React.CSSProperties = {
    border: '2px solid #f78da7', // Borda rosa claro
    borderRadius: '20px', // Bordas arredondadas
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const loginInputFocusStyle: React.CSSProperties = {
    border: '2px solid #941d58', // Borda rosa escuro
    backgroundColor: '#e6f5f1', // Fundo lavanda pastel claro
    color: '#000', // Texto preto
  };

  const loginButtonStyle: React.CSSProperties = {
    backgroundColor: '#fc3153', // Cor de fundo rosa claro
    color: '#fff', // Cor do texto em branco
    border: 'none',
    borderRadius: '8px', // Bordas arredondadas
    padding: '10px 30px', // Espaçamento interno
    fontSize: '16px', // Tamanho da fonte
    fontWeight: 'bold', // Deixa a fonte mais grossa
    cursor: 'pointer', // Muda o cursor para indicar um botão clicável
    display: 'block', // Necessário para a margem automática funcionar
    margin: '0 auto', // Centraliza horizontalmente
  };

  const loginButtonHoverStyle: React.CSSProperties = {
    backgroundColor: '#4fc3f7', // Cor de fundo azul claro quando o mouse passa sobre o botão
    color: '#000', // Cor do texto em preto quando o mouse passa sobre o botão
  };

  const loginDividerStyle: React.CSSProperties = {
    border: '1px solid #f78da7', // Linha rosa claro
    margin: '20px 0',
  };

  const signupTextStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const signupLinkStyle: React.CSSProperties = {
    color: '#8000a0', // Fucsia
    textDecoration: 'underline',
  };

  const [inputFocus, setInputFocus] = useState<string | null>(null);

  return (
    <div style={bodyStyle}>
      <div style={loginContainerStyle}>
        <form
          style={loginFormStyle}
          onSubmit={login}
          className="flex flex-col w-1/2 gap-4"
        >
          <h2 style={loginTitleStyle}>Entrar</h2>
          <div style={inputGroupStyle} className="flex flex-col w-full">
            <label htmlFor="usuario" style={labelStyle}>
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              style={loginInputStyle}
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div style={inputGroupStyle} className="flex flex-col w-full">
            <label htmlFor="senha" style={labelStyle}>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              style={{
                ...loginInputStyle,
                ...(inputFocus === 'senha' ? loginInputFocusStyle : {}),
              }}
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              onFocus={() => setInputFocus('senha')}
              onBlur={() => setInputFocus(null)}
            />
          </div>
          <button
            type="submit"
            style={{
              ...loginButtonStyle,
              ...(inputFocus === 'button' ? loginButtonHoverStyle : {}),
            }}
            onMouseOver={() => setInputFocus('button')}
            onMouseOut={() => setInputFocus(null)}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Entrar</span>
            )}
          </button>
          <hr style={loginDividerStyle} />
          <p style={signupTextStyle}>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" style={signupLinkStyle}>
              Cadastre-se
            </Link>
          </p>
        </form>
        <div style={fundoLoginStyle} className="hidden lg:block"></div>
      </div>
    </div>
  );
}

export default Login;
