from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from typing import List
from models.Persona import Persona
from core.security import access_security
from core.config import settings
from decouple import config

MAIL_USERNAME_: str = config("MAIL_USERNAME", cast=str)
MAIL_PASSWORD_: str = config("MAIL_PASSWORD", cast=str)
MAIL_FROM_: str = config("MAIL_FROM", cast=str)


conf = ConnectionConfig(
    MAIL_USERNAME = MAIL_USERNAME_,
    MAIL_PASSWORD = MAIL_PASSWORD_,
    MAIL_FROM = MAIL_FROM_,
    MAIL_PORT = 465,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = False,
    MAIL_SSL_TLS = True,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True,
)

"""✔"""
#envia un mensaje de verificacion al correo electronico
async def send_verification_email(correo:str, token:str, nombre:str) -> None:
    """ send message user verification email"""
    ## Change this later to public endpoint
    url = settings.ROOT_URL + "/email/verify/" + token
    # body = html_template.format(url=url, nombre=nombre)

    message = MessageSchema(
            recipients=[correo],
            subject="Verifica tu cuenta Vambiental - verifica tu correo y finalizamos creando tu cuenta",
            body=f"""
<body style="background: #F9F9F9;">
  <div style="background-color:#F9F9F9;">
    <div style="margin:0px auto;max-width:640px;background:transparent;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;">
              <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                          <tbody>
                            <tr>
                              <td style="width:138px;">
                                <a href="#" target="_blank">
  <img alt="" title="" height="38px" src="https://github.com/carsanjs/ContextImage/blob/main/On.png" style="border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100%;height:38px;" width="138">
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://lh3.googleusercontent.com/fife/AGXqzDkuStSXNiknEOfy8ZwYfofXp3x0AkM8DESicIPFhI7BZ9WJ0XvFHB6eFgpOWe1-4a2FF3cHQf8fsPftPCM7plWudIUKa6CirgCf9CIiKsLtNOyUZ8SqQqe_ZcOrkOwNLiUJH1a_SeaPgal5Jbv75jaQjAyi72pj7Pzcq4X90CvAKgLbMJQgxY7w5v8zMqebKEZC0BG6oVFnuGiIj_SsKyse4jQOPa9DPz-1eGju4yYcLEzBhUCG62kwszg6AJzm0lGR26Byci4hJHf84zwhpZpv4IHGVOjwmDRH2s6M0CO56curwe80-gok00NFdfNOxuVichZO7F6MnBvLxyCArl56bK2y-iRolC2FnUFY6h9n8eI2r9Jqwohr1pGsGC9jSINdNZyv4uC22oggmA00eyK0-HR2h3vNpC8X8CsGlsBuYwWTdFlFuu-fPZuFyTSHZT2IzykK7rFAzfUMJKa6kxzbd6GJ0moEFzlV9HSHHQbGGA4RwLvmxMMxTxsSr8titzEqeYNRkC1HTiT8TiJHj6z1gwWs4qR8bxQEN52tUlZcLyEJ353ysGWAuZbs_wufklZoA5Ojh3NzGK5v_c9An9kYH_5zAoHWtPptdsm0Y3dSL1bZYHlMTU0RvozvfU0hYdlR8ah8sM9o7CY00AbDnrJhZunD3ulvrOu3s0WKNgcZM2X2mMiNnzwMeM1eQYkEgIhigx6znVADv7HPIbdmWd1-je9rVcq4yZaoPqWmNipvbAXpANBQ4lt_VdZY4sbp8bz3EDqqneHp8Z3BeqACYM65by9p3xzq_4XYfYnZXYb5a2927SYQVwJZDGKPHMXNT6uynFuSRH6H3T3nf6MEAFp_xMeZkDjxw1LslTg7k8cRrYH0btC6u-3eUId8dPo-GFx1A2hwZy7JP2TWvFSov_sPBj6T8Fvlp0QrOMNa7GoywvZdzG8U4dJrQ4-epN9Wcor6J3oMQWLttrX9ucanlxfgNg7QAjtdjx__B6NLCcsgB_ByYHFnqgrk7QiJCsrUxA6IRh_BmCsIwzSNV8OQhzFMGWIxAN-GiVbtKblQ57r-HqfgtDevqJjY_74QfiTBDU6hgytxIImr7I9SZidyIiRDj01oTbF3tVuTMr0akAmnSLzFgcBLSKJUvz82sFrdZEddkGu1gGjXwR8knOs3E9lHckC8DEgVh_nL9-G8jMIvHMOrKsY3aFq67KTOJNWDDFWVp0ZqdzIz54fqfLU_n-df-SpgT9vZY5H3pqXWw5XbVTjc5_6JTpTaBsBxXvh8AWzKr0jsnIDAafkXjC9_aSdJO2UQW1qaqAot6yZlUSgrAe8WcNihRaAOWAeoeaMz9k9bGSNxsWbNXW94VF4jv5lSelqAZcIrzlDCL8PoTPpqIKZRCIfdSPm5TiYPQb6oy6itnaeW_OU_DlvGCxgYBLuG8She3WR43r5EFwaEjeEGwVn3s9DdLLkc2tepYDBv5W_un6UMZnWc5iId3XTPQ8GZxl-KOU8MTQc-HHEnBnDBARYiXKZZpsbAm_Raatff0cmzutvsTSBC1ICTvLyya1UpjjKc7Beo=w605-h638) top center / cover no-repeat;" align="center" border="0" background="https://lh3.googleusercontent.com/fife/AGXqzDkuStSXNiknEOfy8ZwYfofXp3x0AkM8DESicIPFhI7BZ9WJ0XvFHB6eFgpOWe1-4a2FF3cHQf8fsPftPCM7plWudIUKa6CirgCf9CIiKsLtNOyUZ8SqQqe_ZcOrkOwNLiUJH1a_SeaPgal5Jbv75jaQjAyi72pj7Pzcq4X90CvAKgLbMJQgxY7w5v8zMqebKEZC0BG6oVFnuGiIj_SsKyse4jQOPa9DPz-1eGju4yYcLEzBhUCG62kwszg6AJzm0lGR26Byci4hJHf84zwhpZpv4IHGVOjwmDRH2s6M0CO56curwe80-gok00NFdfNOxuVichZO7F6MnBvLxyCArl56bK2y-iRolC2FnUFY6h9n8eI2r9Jqwohr1pGsGC9jSINdNZyv4uC22oggmA00eyK0-HR2h3vNpC8X8CsGlsBuYwWTdFlFuu-fPZuFyTSHZT2IzykK7rFAzfUMJKa6kxzbd6GJ0moEFzlV9HSHHQbGGA4RwLvmxMMxTxsSr8titzEqeYNRkC1HTiT8TiJHj6z1gwWs4qR8bxQEN52tUlZcLyEJ353ysGWAuZbs_wufklZoA5Ojh3NzGK5v_c9An9kYH_5zAoHWtPptdsm0Y3dSL1bZYHlMTU0RvozvfU0hYdlR8ah8sM9o7CY00AbDnrJhZunD3ulvrOu3s0WKNgcZM2X2mMiNnzwMeM1eQYkEgIhigx6znVADv7HPIbdmWd1-je9rVcq4yZaoPqWmNipvbAXpANBQ4lt_VdZY4sbp8bz3EDqqneHp8Z3BeqACYM65by9p3xzq_4XYfYnZXYb5a2927SYQVwJZDGKPHMXNT6uynFuSRH6H3T3nf6MEAFp_xMeZkDjxw1LslTg7k8cRrYH0btC6u-3eUId8dPo-GFx1A2hwZy7JP2TWvFSov_sPBj6T8Fvlp0QrOMNa7GoywvZdzG8U4dJrQ4-epN9Wcor6J3oMQWLttrX9ucanlxfgNg7QAjtdjx__B6NLCcsgB_ByYHFnqgrk7QiJCsrUxA6IRh_BmCsIwzSNV8OQhzFMGWIxAN-GiVbtKblQ57r-HqfgtDevqJjY_74QfiTBDU6hgytxIImr7I9SZidyIiRDj01oTbF3tVuTMr0akAmnSLzFgcBLSKJUvz82sFrdZEddkGu1gGjXwR8knOs3E9lHckC8DEgVh_nL9-G8jMIvHMOrKsY3aFq67KTOJNWDDFWVp0ZqdzIz54fqfLU_n-df-SpgT9vZY5H3pqXWw5XbVTjc5_6JTpTaBsBxXvh8AWzKr0jsnIDAafkXjC9_aSdJO2UQW1qaqAot6yZlUSgrAe8WcNihRaAOWAeoeaMz9k9bGSNxsWbNXW94VF4jv5lSelqAZcIrzlDCL8PoTPpqIKZRCIfdSPm5TiYPQb6oy6itnaeW_OU_DlvGCxgYBLuG8She3WR43r5EFwaEjeEGwVn3s9DdLLkc2tepYDBv5W_un6UMZnWc5iId3XTPQ8GZxl-KOU8MTQc-HHEnBnDBARYiXKZZpsbAm_Raatff0cmzutvsTSBC1ICTvLyya1UpjjKc7Beo=w605-h638">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;">
              <div style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">Welcome to Vambiental!</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin:0px auto;max-width:640px;background:#ffffff;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;">
              <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left">
                        <div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
                          <p><img src="https://cdn.discordapp.com/email_assets/127c95bbea39cd4bc1ad87d1500ae27d.png" alt="Party Wumpus" title="None" width="500" style="height: auto;"></p>
                          <h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">
                          {nombre},
                          </h2>
                          <p></p>
                          <p>¡Vaya! Agradecemos tu registro en Vambiental. Realmente apreciamos que hayas decidido unirte. Queremos asegurarnos de que tengas la mejor experiencia con nosotros.</p>
                          <p>Antes de sumergirnos, necesitamos validar tu dirección de correo electrónico.</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0">
                          <tbody>
                            <tr>
                              <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;" align="center" valign="middle" bgcolor="#096EFD">
                                <a href="{url}" style="text-decoration:none;line-height:100%; background:#096EFD;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
                                  Confirm email address
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin:0px auto;max-width:640px;background:transparent;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;">
              <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;">
                        <div style="font-size:1px;line-height:12px;">&nbsp;</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin:0px auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;">
      <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;">
              <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin:0px auto;max-width:640px;background:transparent;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;">
              <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;" align="center">
                        <div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
                          Enviado by Vambiental • <a href="#" style="color:#1EB0F4;text-decoration:none;" target="_blank">check our blog</a> • <a href="#" style="color:#1EB0F4;text-decoration:none;" target="_blank">@vambientalApp</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;" align="center">
                        <div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
                          Cra 40 VIA AL MAR, Municipio de Aguachica-Cesar
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>""",
            subtype="html",
    )
    fn = FastMail(conf)
    await fn.send_message(message)


"""✔"""
#envia un mensaje al correo electronico para cambiar la contraseña
async def send_password_reset_email(correo: List, token: str, nombre:str) -> None:
    """Send password reset email."""
    # Change this later to public endpoint
    url = settings.ROOT_URL + "/reset-password/" + token
    message = MessageSchema(
            recipients=[correo],
            subject="Solicitud de restablecimiento de contraseña para VambientalApp",
            body=f"""<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #FFFFFF;
	color: #000000;"
	bgcolor="#FFFFFF"
	text="#000000">

<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;">

<table border="0" cellpadding="0" cellspacing="0" align="center"
	width="600" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 600px;" class="wrapper">

	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;
			padding-top: 20px; padding-bottom: 20px" bgcolor="#fff">
<img border="0" vspace="0" hspace="0"
				src="https://lh3.googleusercontent.com/fife/AGXqzDlQcKYHoAcw17-iAQ6NtDOPuW9RWUcJspF94CftdSV07JiidCmniaci_qQZlI6MCWhw7m8UufSNWsZFBfh13RMrvXATu2fxhnTP75G0Tkb6lpSpq_DgkOfEtlQ-O6ohhodgBPQ923MWlQhNOwZ9jLYCijPkCXXeTk5C71bELl80MAo4ZSAfZiFVg5SzrK7d5wSjC-J6ttDJHT8Kw_Uyb6Bq12uSsNXINUDzD3Nmrrk6EPRBW75pHZ-bY-YO7fDQoX9cPK8P2bipkguVblwJn2V1y-2LiwI9G01lny41b4dbr3j5G5J0PYgkMRdFlB91BzKFI_7NG7OEBYY54oLT77kmQ-3Jr2YhUEqqsAdt3ClmghR1os9QhG_snfcV-6NVEmB-z6OmwYIuZ0cTWdwrwG9ANlWaZgJqrKDGYrhYXwDr0rBDhIqYuVm_REQq0N3smS4Djw17p-pMk8wm-A5I8T79MefdcZ3GIhjxx_Ddg9MQSZUFx_yjovAEBbX_nLGks6qTJSTryFoQcbUeU5emhRBDZyj9UyvI3frx9Eu5dVQDA7wZhMUA1u2gdT3ogOquEpt4api4GyitO6I_s-vt6dDmvf0pamK_S9-bwIuaCDB3IU5ByNt97FE7TkFK2rNWblSn6kvrouqvyfqIb6H5cCiZ7vbyYNfdk23xtVJJPyp-hJg_4ba6hOOsDqGzq5WLWkAbzG5FHh4pyLC0EvcmZ33z9UsR8GUW2DlnUaBjJTzt9L2GWSqLDqZoUz8zmDCkiB-shYFDbBZ1JeB3WF03RseeXEQkmrqALKM2LIE1Di9nDig8hRVU7x_d3b04VILVUERyV9ut67Lkf0itIygIXCo8pZEc0S33fOkxC0sx44IRrS0g_w2Fitl-bXTgGxlMRpDqC7pbIPAX4XftZdq0Iy8WthQDU_exbeqystQRz7DCxUUexreo8MpE7o-DCoi_V0xVn0ueTYcOT77W09YoxI9_x8WHjZOe9ZaVM_HT2FSP1N0r9R67P9ZisN-AaVfffe4J8VuZIOgn7F_d9rQyZoaVtKhmKtPzmMOi7hVHSz3jvKPuMbPNYdTRU8Ll86KmFWlp23E4mjYkbD-PJ97fjLErUzzn1j10_Ve3Rq7rvWg8cGAKbxOXh5kAM0MrSWhzXIedl3pH49jm487vvwV4GNKv55wuv2ykWCh3mmRBopvmmVNUeKGeao67OAk62Xp1K4BRUXwDeEgIr5AoMUu-R3ozu4rwTHVCCqCRDnLeleYrJOqVEY7epBNpSY43m5EJqWP2yCDcqIURj3ilsO6GzgDJYdjP-IuE0egZna6PhA6mhfSC9vZjQGxjUEQ9b3M6bLM5-cTxbdIrj23YqpTdibfpNUSaS2l_PJHcp_emzugbq7BYwmuA8Do_dugwKpMI8L6B-lCHUWlEU_c4nHdtWy7H-3ySQLRdgiA2n6LBP0t1VL6USr8pfmBV0NjwrHN0Lw4jQUGfwEs1I2Lbuzej3BnileT9uY9-0Gxktcecf1lQKLvWz9uGgbuvktt9ecSN0WMEuE43tls11f5fPyE-o-dnmmuBhThe=w1318-h654"
				width="120"
				alt="Logo" title="Logo" style="
				color: #000000;
				font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" />

		</td>
	</tr>

	

	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" bgcolor="#D6EAF8" class="hero">
			<img align="center" alt="Forgot your password?" class="mcnImage" src="https://static.lingoapp.com/assets/images/email/il-password-reset@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
 text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom:
 0; display: inline !important; vertical-align: bottom;" width="600"></td>
	</tr>
  <tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
			padding-top: 20px;
			color: #073a60;
			font-family: sans-serif;" class="header" bgcolor="#D6EAF8">
				Cambia tu contraseña
		</td>
	</tr>

	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
																					 
			padding-bottom: 25px;
			color: #073a60;
			font-family: sans-serif;" bgcolor="#D6EAF8" class="paragraph">
				{nombre}. Hemos recibido la solicitud para cambiar su contraseña. Haga clic en el botón. Te llevará a un enlace seguro, allí podrás cambiar tu contraseña.
		</td>
	</tr>

</table>

</td></tr><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
	padding-top: 5px;"
	bgcolor="#FFFFFF">

<table border="0" cellpadding="0" cellspacing="0" align="center"
	width="600" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 600px;">
   	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 30px;
			padding-bottom: 0px;" class="button">
				<table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 500px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: none; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
					bgcolor="	#009f8b"><a target="_blank" style="text-decoration: none; cursor: pointer;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;"
					href="{url}">
						Haga clic aquí para cambiar su contraseña
					</a>
					<br>
			</td></tr></table>
		</td>
	</tr>
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; min-width: 350px; font-size: 13px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
          padding-bottom: 30px;
			color: #333;
			font-family: sans-serif;" class="paragraph">
      <p style="max-width: 350px;line-height: 160%">
			Si no intentaste restablecer tu contraseña, puedes ignorar este mensaje de forma segura y tu contraseña seguirá siendo la misma.
      </p>
		</td>
	</tr>
</table>
</td>
</tr>
</table>
</body>""",
            subtype="html",
        )
    fn = FastMail(conf)
    await fn.send_message(message)


"""✔"""
async def user_from_token(token: str) -> Persona | None:
        """Return the user associated with a token value."""
        payload = access_security._decode(token)
        print("payloadaa", payload)
        correo = payload['subject']['username']
        # sub_dict = ast.literal_eval(payload['sub'])
        # print("sub dict", sub_dict)
        # correo = sub_dict.get('correo')
        print("correo ---", correo)
        return await Persona.by_correo(correo)

