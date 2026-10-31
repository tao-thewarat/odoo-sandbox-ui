export default function Login() {
  const failed = new URLSearchParams(window.location.search).has('login_error')

  return (
    <section className="sb-login">
      <div className="sb-login-inner">
        <h1 className="sb-brand"><img className="sb-logo" src="/icon.png" alt="" />Odoo Sandbox</h1>
        <p>Spin up a clean Odoo environment. Test your addons.</p>
        <a className="sb-ms" href="/auth/login">
          <span className="sb-msmark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          Continue with Microsoft
        </a>
        {failed && <p className="sb-error" role="alert">Sign-in failed. Please try again.</p>}
      </div>
    </section>
  )
}
