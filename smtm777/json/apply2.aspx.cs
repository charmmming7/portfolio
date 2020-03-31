using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Odbc;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class json_apply : System.Web.UI.Page
{
    protected string result;

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.ContentType = "application/json";

        try
        {
            // Params
            string receiver_name = Request.Params["delivery_username"];
            string receiver_mobile = Request.Params["delivery_userphone"];
            string zipcode = Request.Params["delivery_zipcode"];
            string addr1 = Request.Params["delivery_address"];
            string addr2 = Request.Params["delivery_address"];
            string apply_memo = Request.Params["delivery_memo"];
            string applycode = Request.Params["code"];

            // DB Insert
            SqlConnection objCon = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnectionString"].ConnectionString);
            SqlCommand objCmd = new SqlCommand("[Apply_C_SMTM]", objCon);

            objCmd.CommandType = CommandType.StoredProcedure;            
            objCmd.Parameters.AddWithValue("@receiver_name", receiver_name);
            objCmd.Parameters.AddWithValue("@receiver_mobile", receiver_mobile);
            objCmd.Parameters.AddWithValue("@zipcode", zipcode);
            objCmd.Parameters.AddWithValue("@addr1", addr1);
            objCmd.Parameters.AddWithValue("@addr2", addr2);
            objCmd.Parameters.AddWithValue("@apply_memo", apply_memo);
            objCmd.Parameters.AddWithValue("@applycode", applycode);

            objCon.Open();
            /*objCmd.ExecuteNonQuery();*/
            
            SqlDataReader dr = objCmd.ExecuteReader();

            if (dr.Read())
            {
                result = dr["result"].ToString();                
            }
            
            objCon.Close();

            /*result = "success";*/
        }
        catch (Exception)
        {
            //throw;
            result = "error";
        }
    }
}