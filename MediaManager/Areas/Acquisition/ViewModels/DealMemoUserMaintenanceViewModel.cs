using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.AcquisitionLookupService;
using MediaManager.DealMemoService;
using System.ComponentModel;
using MediaManager.Areas.Acquisition.BO;
using MediaManager.Infrastructure.Lookups;
using System.ComponentModel.DataAnnotations;



namespace MediaManager.Areas.Acquisition.ViewModels
{
    public class DealMemoUserMaintenanceViewModel
    { 
        #region : Variables
        
        public string mindpackUsername { get; set; }
        public string repCompanyname { get; set; }
        public string repLicense { get; set; }
        public string PersistFlag { get; set; }
        public List<DealMemoService.AppMessage> CustomOracleMessage ;

        List<UserVO> ChangeUserList = null;
        #endregion
        
        #region : List declarations
        
        public List<UserVO> DealMemoSearchUserDetails { get; set; }
        public List<UserVO> mindpackUsernameList { get; set; }
        public List<UserVO> repCompanynameList { get; set; }
        public List<UserVO> repLicenseList { get; set; }
        #region : User Look up List
        public List<ActiveUserLookupItem> ActiveUserList { get; set; }
        #endregion

        #endregion
        
        #region : Objects
        DealMemoClient proxy = null;
        SearchUserRequest request = null;
        SearchUserResponse response = null;

        AcquisitionLookupServiceClient LookupProxy = null;
        ActiveUserLookupRequest LookupRequest = null;
        ActiveUserLookupResponse LookupResponse = null;
        
        #endregion

        #region : Persit Flag
        public enum PersistFlagEnum : int
        {

            [System.Runtime.Serialization.EnumMemberAttribute()]
            Added = 0,

            [System.Runtime.Serialization.EnumMemberAttribute()]
            Modified = 1,

            [System.Runtime.Serialization.EnumMemberAttribute()]
            Deleted = 2,

            [System.Runtime.Serialization.EnumMemberAttribute()]
            UnModified = 3,
        }
        #endregion

        #region : Genreate userNameLookup

        public static TLookUpItem AcquitionsLookItemConvertor<TLookUpItem>(AcquisitionLookupService.LookupItem li) where TLookUpItem : AcquisitionLookupService.LookupItem
        {
            return (TLookUpItem)li;
        }
        public List<ActiveUserLookupItem> GetActiveUserDetails(string filterValue)   //string userName
        {
                ActiveUserLookup objActiveuserlookup = new ActiveUserLookup();
                objActiveuserlookup.LookupItemList = ShowActiveUserLOV(ModuleEnum.Acquisition, LookupKeyEnum.ActiveUserLookup);
                Converter<LookupItem, ActiveUserLookupItem> activeUserLookupConvertor = new Converter<LookupItem, ActiveUserLookupItem>(AcquitionsLookItemConvertor<ActiveUserLookupItem>);
                List<ActiveUserLookupItem> activeUserLookupList = new List<ActiveUserLookupItem>();
                activeUserLookupList = objActiveuserlookup.LookupItemList.ConvertAll<ActiveUserLookupItem>(activeUserLookupConvertor);
                if (!string.IsNullOrEmpty(filterValue) && activeUserLookupList !=null)
                {
                    filterValue = filterValue.Replace("%", " ");
                    filterValue = filterValue.Trim().ToLower();
                    ActiveUserLookupItem objActiveUserLookupItem = null;
                    if (!string.IsNullOrEmpty(filterValue))
                    {
                        //objActiveUserLookupItem = (from sub in activeUserLookupList
                        //                        where (sub.UserID.ToLower().Equals(filterValue) || sub.UserName.ToLower().Equals(filterValue))select sub).FirstOrDefault();
                        objActiveUserLookupItem = (from sub in activeUserLookupList
                                                   where (sub.UserID.ToLower().StartsWith(filterValue) || sub.UserName.ToLower().StartsWith(filterValue))
                                                   select sub).FirstOrDefault();
                               
                    }
                    if (objActiveUserLookupItem != null)
                    {
                        activeUserLookupList = (from sub in activeUserLookupList
                                                where sub.UserID.ToLower().StartsWith(filterValue)
                                                select sub).ToList();
                        return activeUserLookupList;
                    }
                            
                }
                return activeUserLookupList;
        }
        public List<LookupItem> ShowActiveUserLOV(ModuleEnum moduleEnum, LookupKeyEnum lookKeyEnum)
        {
            LookupProxy = new AcquisitionLookupServiceClient();
            LookupRequest = new ActiveUserLookupRequest();
            LookupResponse = new ActiveUserLookupResponse();
            try
            {
                LookupProxy.Open();
                LookupRequest.ModuleEnum = moduleEnum;
                LookupRequest.LookupKeyEnum = lookKeyEnum;
                LookupResponse = LookupProxy.GetActiveUser(LookupRequest);
            }
            catch
            {

            }
            finally
            {
                LookupProxy.Close();
            }
            return LookupResponse.Lookup.LookupItemList;
        }
        #endregion
        
        #region : Genrate Representing Licensee 

        public static TLookUpItem LookItemConvertor<TLookUpItem>(LookupsServices.LookupItem li) where TLookUpItem : LookupsServices.LookupItem
        {
            return (TLookUpItem)li;
        }
        public List<LookupsServices.LicenseeLookupItem> GetLicenseeDetails(string filterValue)
        {
            MediaManager.LookupsServices.LicenseeLookup objLicenseelookup = new LookupsServices.LicenseeLookup();
            objLicenseelookup.LookupItemList = ShowLicenseLookup(LookupsServices.ModuleEnum.Acquisition, LookupsServices.LookupKeyEnum.LicenseeLookup);

            Converter<LookupsServices.LookupItem, LookupsServices.LicenseeLookupItem> licenseeLookupItemConvertor = new Converter<LookupsServices.LookupItem, LookupsServices.LicenseeLookupItem>(LookItemConvertor<LookupsServices.LicenseeLookupItem>);
            List<LookupsServices.LicenseeLookupItem> licenseeLookupItemList = new List<LookupsServices.LicenseeLookupItem>();
            licenseeLookupItemList = objLicenseelookup.LookupItemList.ConvertAll<LookupsServices.LicenseeLookupItem>(licenseeLookupItemConvertor);

            if (!string.IsNullOrEmpty(filterValue) && licenseeLookupItemList !=null)
            {
                filterValue = filterValue.Replace("%", " ");
                filterValue = filterValue.Trim().ToLower();
                LookupsServices.LicenseeLookupItem objLicenseeLookupItem = null;
                            if (!string.IsNullOrEmpty(filterValue))
                            {
                                objLicenseeLookupItem = (from ent in licenseeLookupItemList
                                                         where ent.LicenseeShortName.ToLower().StartsWith(filterValue.ToLower())
                                                         select ent).FirstOrDefault();
                                
                            }
                            if (objLicenseeLookupItem != null)
                            {
                                licenseeLookupItemList = (from ent in licenseeLookupItemList
                                                          where ent.LicenseeShortName.ToLower().StartsWith(filterValue.ToLower())
                                                          select ent).ToList();
                                return licenseeLookupItemList;
                            }
            }

            return licenseeLookupItemList;
        }
        public List<MediaManager.LookupsServices.LookupItem> ShowLicenseLookup(MediaManager.LookupsServices.ModuleEnum moduleEnum, MediaManager.LookupsServices.LookupKeyEnum lookupKeyEnum)
        {
            MediaManager.LookupsServices.GetLicenseeResponse response = new LookupsServices.GetLicenseeResponse();
            MediaManager.LookupsServices.GetLicenseeRequest request = new LookupsServices.GetLicenseeRequest();
            MediaManager.LookupsServices.LookupsClient proxy = new LookupsServices.LookupsClient();
            try
            {
                proxy.Open();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                response = proxy.GetLicensee(request);
            }
            catch
            {

            }
            finally
            {
                proxy.Close();
            }
            return response.LookUp.LookupItemList;
        }

        #endregion

        #region : Genrate Company Details
        public List<UserCompDetailLookupItem> GetCompanyDetails(string filterValue)
        {
            UserCompDetailLookup objCompanyDetails = new UserCompDetailLookup();
            objCompanyDetails.LookupItemList = ShowCompanyDetailsLookUp(ModuleEnum.Acquisition, LookupKeyEnum.UserCompDetailLookup);
            Converter<LookupItem, UserCompDetailLookupItem> companydetailLookupConvertor = new Converter<LookupItem, UserCompDetailLookupItem>(AcquitionsLookItemConvertor<UserCompDetailLookupItem>);
            List<UserCompDetailLookupItem> userCompLookupList = new List<UserCompDetailLookupItem>();
            userCompLookupList = objCompanyDetails.LookupItemList.ConvertAll<UserCompDetailLookupItem>(companydetailLookupConvertor);
            if (!string.IsNullOrEmpty(filterValue))
            {
                filterValue = filterValue.Replace("%", " ");
                filterValue = filterValue.Trim().ToLower();
                UserCompDetailLookupItem objUserCompDetailLookupItem = null;
                if (!string.IsNullOrEmpty(filterValue))
                {
                    objUserCompDetailLookupItem = (from ent in userCompLookupList
                                          where ent.ComShortName.ToLower().StartsWith(filterValue)
                                          select ent).FirstOrDefault();
                }

                if (objUserCompDetailLookupItem != null)
                {
                    userCompLookupList = (from ent in userCompLookupList
                                          where ent.ComShortName.ToLower().StartsWith(filterValue)
                                          select ent).ToList();
                    return userCompLookupList;
                }
            }
            return userCompLookupList;
        }
        public List<MediaManager.AcquisitionLookupService.LookupItem> ShowCompanyDetailsLookUp(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                UserCompDetailLookupRequest request = new UserCompDetailLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                UserCompDetailLookupResponse response = proxy.GetCompanyDetail(request);
                return response.Lookup.LookupItemList;
            }
            finally
            {
                proxy.Close();
            }
        }
        #endregion

        #region : Search Method for Deal Memo User Maintenance
        public List<UserVO> SearchDealMemoUserDetails(UserVO userVoObj)
        {
            response = new SearchUserResponse();
            request = new SearchUserRequest();
            proxy = new DealMemoClient();
            try
            {
                proxy.Open();
                request.UserList = userVoObj;
                response = proxy.SearchUserDetails(request);
            }
            catch
            {
            }
            finally
            {
                proxy.Close();
            }
            return response.UserList;
        }
        #endregion

        #region
        public List<UserVO> SearchDealMemoUserDetails()
        {
            UserVO userVoObj=new UserVO();
            response = new SearchUserResponse();
            request = new SearchUserRequest();
            proxy = new DealMemoClient();
            try
            {
                proxy.Open();
                request.UserList = userVoObj;
                response = proxy.SearchUserDetails(request);
            }
            catch
            {
            }
            finally
            {
                proxy.Close();
            }
            return response.UserList;
        }
        #endregion


        #region : Adding Deal Memo User Maintenance
        public List<UserVO> Save(List<UserVO> objUserList)
        {
                ChangeUserList = new List<UserVO>();
               
                for (int i = 0; i < objUserList.Count; i++)
                    {
                        UserVO userVoobject = new UserVO();
                        if (objUserList[i].PersistFlag == DealMemoService.PersistFlagEnum.Added)
                        {
                            userVoobject.UserName = objUserList[i].UserName.ToUpper();
                            userVoobject.RepCompanyName = objUserList[i].RepCompanyName.ToUpper();
                            userVoobject.RepLicensee = objUserList[i].RepLicensee.ToUpper();
                            userVoobject.SignQA = objUserList[i].SignQA;
                            userVoobject.SuperUser = objUserList[i].SuperUser;
                            userVoobject.DefaultUser = objUserList[i].DefaultUser;
                            userVoobject.EditDM = objUserList[i].EditDM;
                            userVoobject.Buyer = objUserList[i].Buyer;
                            userVoobject.SignDM = objUserList[i].SignDM;
                            userVoobject.SignFin = objUserList[i].SignFin;
                            userVoobject.SignCFO = objUserList[i].SignCFO;
                            userVoobject.SignCAd = objUserList[i].SignCAd;
                            userVoobject.SignHOA = objUserList[i].SignHOA;
                            userVoobject.PersistFlag = DealMemoService.PersistFlagEnum.Added;
                        }
                        if (objUserList[i].PersistFlag == DealMemoService.PersistFlagEnum.Modified)
                        {
                            userVoobject.UpdateCount = objUserList[i].UpdateCount;
                            userVoobject.UserNumber = objUserList[i].UserNumber;
                            userVoobject.UserName = objUserList[i].UserName;
                            userVoobject.RepCompanyName = objUserList[i].RepCompanyName;
                            userVoobject.RepLicensee = objUserList[i].RepLicensee;
                            userVoobject.SignQA = objUserList[i].SignQA;
                            userVoobject.SuperUser = objUserList[i].SuperUser;
                            userVoobject.DefaultUser = objUserList[i].DefaultUser;
                            userVoobject.EditDM = objUserList[i].EditDM;
                            userVoobject.Buyer = objUserList[i].Buyer;
                            userVoobject.SignDM = objUserList[i].SignDM;
                            userVoobject.SignFin = objUserList[i].SignFin;
                            userVoobject.SignCFO = objUserList[i].SignCFO;
                            userVoobject.SignCAd = objUserList[i].SignCAd;
                            userVoobject.SignHOA = objUserList[i].SignHOA;
                            userVoobject.PersistFlag = DealMemoService.PersistFlagEnum.Modified;
                        }
                        ChangeUserList.Add(userVoobject);
                    }

                    ChangeUserList=SaveUserDetails(ChangeUserList);
                    return ChangeUserList;
            }
            public List<UserVO> SaveUserDetails(List<UserVO> objUserlist)
            {
                SaveUserResponse saveUserresponse = new SaveUserResponse();
                SaveUserRequest saveUserRequest = new SaveUserRequest();
                proxy = new DealMemoClient();
                try
                {
                    proxy.Open();
                    saveUserRequest.UserList = objUserlist;
                    saveUserresponse = proxy.SaveUserDetails(saveUserRequest);
                    if (saveUserresponse.Messages != null && saveUserresponse.Messages.Count > 0)
                    {
                        this.CustomOracleMessage = new List<DealMemoService.AppMessage>();
                        this.CustomOracleMessage = saveUserresponse.Messages;
                    }
                }
                catch(Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    proxy.Close();
                }
                return saveUserresponse.UserList;
            }
            #endregion

    }
}