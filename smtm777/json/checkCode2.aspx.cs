using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class json_checkCode : System.Web.UI.Page
{
    protected string applyCode;
    protected string result;
    protected string result2;

     protected void Page_Load(object sender, EventArgs e)
    {
        Response.ContentType = "application/json";

        applyCode = Request["code"];
        try
        {
            SqlConnection objCon = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnectionString"].ConnectionString);
            SqlCommand objCmd = new SqlCommand("[Check_Code_SMTM2]", objCon);            
         
            objCmd.CommandType = CommandType.StoredProcedure;
            objCmd.Parameters.AddWithValue("@applyCode", applyCode);

            objCon.Open();
            SqlDataReader dr = objCmd.ExecuteReader();

            if (dr.Read())
            {
                result = dr["out"].ToString();
                result2 = dr["out2"].ToString();
            }
            else
            {

            }
            objCon.Close();
        }
        catch (Exception)
        {
            throw;
			result = "error";
            result2 = "error";
        }
    }
}
