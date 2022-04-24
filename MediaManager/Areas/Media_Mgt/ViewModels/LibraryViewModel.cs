using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using MediaManager.MediaManagerLibraryService;
using MediaManager.Areas.Media_Mgt.Common;

//using MediaManager.Areas.Media_Mgt.Common;

namespace MediaManager.Areas.Media_Mgt.ViewModels
{
    public class SearchLibraryDetail : BaseVO
    {
        public string LibraryID { get; set; }
        public string LibraryName { get; set; }
        public string Location { get; set; }
        public string LocationID { get; set; }
        public string StorageType { get; set; }
        public string StorageTypeID { get; set; }
        public string Storage { get; set; }
        public string Status { get; set; }
        public string StatusVal { get; set; }
        public string UserName { get; set; }
        public string CreatedDate { get; set; }

        public SearchLibraryDetail(string StorageTypeID, string Storage)
        {
            this.StorageTypeID = StorageTypeID;
            this.Storage = Storage;
        }

        public SearchLibraryDetail(string LibraryID, string LibraryName, string Location, string LocationID, string CreatedDate, Enum PersistFlag)
        {
            this.LibraryID = LibraryID;
            this.LibraryName = LibraryName;
            this.Location = Location;
            this.LocationID = LocationID;
            this.CreatedDate = CreatedDate;
            this.PersistFlag = PersistFlagEnum.UnModified;
        }

        public SearchLibraryDetail(string LibraryID, string LibraryName, string StorageType, string StorageTypeID, string Storage, string CreatedDate, Enum PersistFlag)
        {
            this.LibraryID = LibraryID;
            this.LibraryName = LibraryName;
            this.StorageType = StorageType;
            this.StorageTypeID = StorageTypeID;
            this.Storage = Storage;
            this.CreatedDate = CreatedDate;
            this.PersistFlag = PersistFlagEnum.UnModified;
        }

        public SearchLibraryDetail(string LibraryID, string LibraryName, string UserName, string Status, string StatusVal)
        {
            this.LibraryID = LibraryID;
            this.LibraryName = LibraryName;
            this.UserName = UserName;
            this.Status = Status;
            this.StatusVal = StatusVal;
            this.PersistFlag = PersistFlagEnum.UnModified;
        }
    }

    public class LibraryViewModel
    {
        public string LibraryID;
        public string LibraryName;
        public SelectList Library;
        public SelectList Type;
        public SelectList StorageType;
        public SelectList Location;
        public string Storage;
        public DateTime Date;
        public string TypeVal;
        public List<SearchLibraryDetail> libraryList { get; set; }
        public List<IDValPair> listIDValPair { get; set; }

        public LibraryViewModel()
        {
            listIDValPair = GetFidCodeList("LOC");
        }

        public List<IDValPair> GetFidCodeList(string CodeType)
        {
            LibraryMaintainenceClient proxy = null;
            GetFIDCodeIDValResponse response = new GetFIDCodeIDValResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                GetFIDCodeIDValRequest request = new GetFIDCodeIDValRequest();
                request.FidCodeVO = new FidCodeVO();
                if (request.FidCodeVO != null)
                {
                    request.FidCodeVO.COD_TYPE = CodeType;
                    response = proxy.GetFidCodeList(request);
                }
                listIDValPair = new List<IDValPair>();
                foreach (FidCodeVO fidCodeVO in response.FidCodeListVOList)
                {
                    listIDValPair.Add(new IDValPair(fidCodeVO.COD_VALUE.ToString(), fidCodeVO.COD_DESCRIPTION.ToString()));
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                proxy.Close();
            }
            return listIDValPair;
        }

        public List<SearchLibraryDetail> GetStorageList(string StorageTypeID)
        {
            LibraryMaintainenceClient proxy = null;
            SearchLibraryResponse response = new SearchLibraryResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SearchLibraryRequest request = new SearchLibraryRequest();
                request.LibraryVO = new LibraryVO();
                if (request.LibraryVO != null)
                {
                    request.LibraryVO.StorageTypeID = StorageTypeID;
                    response = proxy.GetStorageList(request);
                }
                libraryList = new List<SearchLibraryDetail>();
                foreach (LibraryVO libraryVO in response.LibrarySearchList)
                {
                    libraryList.Add(new SearchLibraryDetail(libraryVO.StorageTypeID, libraryVO.StorageID));
                }
            }
            finally
            {
                proxy.Close();
            }
            return libraryList;
        }

        public string GetMaxStorage(string LibraryID, string StorageTypeID)
        {
            LibraryMaintainenceClient proxy = null;
            string NextVal = "";
            SearchLibraryResponse response = new SearchLibraryResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SearchLibraryRequest request = new SearchLibraryRequest();
                request.LibraryVO = new LibraryVO();
                if (request.LibraryVO != null)
                {
                    request.LibraryVO.LibraryID = LibraryID;
                    request.LibraryVO.StorageTypeID = StorageTypeID;
                    response = proxy.GetMaxStorage(request);
                    foreach (LibraryVO vo in response.LibrarySearchList)
                    {
                        if (vo.Storage != null)
                        {
                            if (vo.Storage.Contains("BOX"))
                            {
                                int Num = Convert.ToInt32(vo.Storage.Substring(3));
                                NextVal = "BOX" + (Num + 1).ToString();
                            }
                            else
                            {
                                int Num = Convert.ToInt32(vo.Storage.Substring(4));
                                NextVal = "SHELF" + (Num + 1).ToString();
                            }
                        }
                        else
                        {
                            if (StorageTypeID.Contains("BX"))
                            {
                                NextVal = "BOX1";
                            }
                            else
                            {
                                NextVal = "SHELF1";
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                proxy.Close();
            }
            return NextVal;
        }


        public List<LibraryVO> GetLibrary()
        {
            LibraryMaintainenceClient proxy = null;
            SearchLibraryResponse response = new SearchLibraryResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SearchLibraryRequest request = new SearchLibraryRequest();
                request.LibraryVO = new LibraryVO();
                if (request.LibraryVO != null)
                {
                    response = proxy.GetLibrary(request);
                }
            }
            finally
            {
                proxy.Close();
            }
            return response.LibrarySearchList;
        }

        public List<LibraryVO> SearchLibraryDetail(string LibraryID, string LibraryName, string Location)
        {
            if ((HttpContext.Current.Session["callContext"] == null) || (HttpContext.Current.Session["callContext"] != null &&
                ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Current.Session["callContext"]).MENUserId == null))
            {
                throw new Exception("Your session has expired.ReLogin is required.");
            }

            LibraryMaintainenceClient proxy = null;
            SearchLibraryResponse response = new SearchLibraryResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SearchLibraryRequest request = new SearchLibraryRequest();
                request.LibraryVO = new LibraryVO();
                if (request.LibraryVO != null)
                {
                    request.LibraryVO.LibraryID = LibraryID;
                    request.LibraryVO.LibraryName = LibraryName;
                    request.LibraryVO.Location = Location;
                    response = proxy.SearchLibrary(request);
                }
                //libraryList = new List<SearchLibraryDetail>();
                //foreach (LibraryVO libraryVO in response.LibrarySearchList)
                //{
                //    libraryList.Add(new SearchLibraryDetail(libraryVO.LibraryID, libraryVO.LibraryName, libraryVO.Location, libraryVO.LocationID, libraryVO.DateCreated.ToString("dd-MMM-yyyy"), libraryVO.PersistFlag));
                //}
            }
            finally
            {
                proxy.Close();
            }
            return response.LibrarySearchList;
        }

        public List<LibraryVO> SaveLibraryDetail(List<LibraryVO> listLibrary)
        {
            LibraryMaintainenceClient proxy = null;
            SearchLibraryResponse response = new SearchLibraryResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SearchLibraryRequest request = new SearchLibraryRequest();
                request.LibraryVO = new LibraryVO();
                if (request.LibraryVO != null)
                {

                    //foreach (LibraryVO libraryVO in listLibrary)
                    //{
                    //    int i = 0;
                    //    request.LibraryVO.LibraryID = libraryVO.LibraryID;
                    //    request.LibraryVO.LibraryName = libraryVO.LibraryName;
                    //    request.LibraryVO.LocationID = libraryVO.LocationID;
                    //    request.LibraryVO.PersistFlag = PersistFlagEnum.Added;

                    //}
                    request.LibraryVO.listLibraryVO = listLibrary.ToList();
                    response = proxy.SaveLibraryDetail(request);
                }
                //libraryList = new List<SearchLibraryDetail>();
                //foreach (LibraryVO libraryVO in response.LibrarySearchList)
                //{
                //    libraryList.Add(new SearchLibraryDetail(libraryVO.LibraryID, libraryVO.LibraryName, libraryVO.Location, libraryVO.LocationID, libraryVO.DateCreated.ToString("dd-MMM-yyyy"), libraryVO.PersistFlag));
                //}
            }
            finally
            {
                proxy.Close();
            }
            return response.LibrarySearchList;
        }

        public List<LibraryVO> SearchLibraryStorageDetail(string LibraryID)
        {
            if ((HttpContext.Current.Session["callContext"] == null) || (HttpContext.Current.Session["callContext"] != null &&
                ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Current.Session["callContext"]).MENUserId == null))
            {
                throw new Exception("Your session has expired.ReLogin is required.");
            }

            LibraryMaintainenceClient proxy = null;
            SearchLibraryResponse response = new SearchLibraryResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SearchLibraryRequest request = new SearchLibraryRequest();
                request.LibraryVO = new LibraryVO();
                if (request.LibraryVO != null)
                {
                    request.LibraryVO.LibraryID = LibraryID;
                    response = proxy.SearchLibraryStorageDetail(request);
                }
                //libraryList = new List<SearchLibraryDetail>();
                //foreach (LibraryVO libraryVO in response.LibrarySearchList)
                //{
                //    libraryList.Add(new SearchLibraryDetail(libraryVO.LibraryID, libraryVO.LibraryName, libraryVO.StorageType, libraryVO.StorageTypeID, libraryVO.Storage, libraryVO.DateCreated.ToString("dd-MMM-yyyy"), libraryVO.PersistFlag));
                //}
                ////maxBoxTypeStorage = new List<ViewModels.SearchLibraryDetail>();                               
            }
            catch
            {
                return response.LibrarySearchList;
            }
            finally
            {
                proxy.Close();
            }
            return response.LibrarySearchList;
        }

        public List<LibraryVO> SaveLibraryStorageDetail(List<LibraryVO> listLibrary)
        {
            LibraryMaintainenceClient proxy = null;
            SearchLibraryResponse response = new SearchLibraryResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SearchLibraryRequest request = new SearchLibraryRequest();
                request.LibraryVO = new LibraryVO();
                if (request.LibraryVO != null)
                {

                    //foreach (LibraryVO libraryVO in listLibrary)
                    //{
                    //    int i = 0;
                    //    request.LibraryVO.LibraryID = libraryVO.LibraryID;
                    //    request.LibraryVO.LibraryName = libraryVO.LibraryName;
                    //    request.LibraryVO.LocationID = libraryVO.LocationID;
                    //    request.LibraryVO.PersistFlag = PersistFlagEnum.Added;

                    //}
                    request.LibraryVO.listLibraryVO = listLibrary.ToList();
                    response = proxy.SaveLibraryStorageDetail(request);
                }
                //libraryList = new List<SearchLibraryDetail>();
                //foreach (LibraryVO libraryVO in response.LibrarySearchList)
                //{
                //    libraryList.Add(new SearchLibraryDetail(libraryVO.LibraryID, libraryVO.LibraryName, libraryVO.StorageType, libraryVO.StorageTypeID, libraryVO.Storage, libraryVO.DateCreated.ToString("dd-MMM-yyyy"), libraryVO.PersistFlag));
                //}
            }
            finally
            {
                proxy.Close();
            }
            return response.LibrarySearchList;
        }
    }

    public class LibraryUsers
    {
        public string LibraryID { get; set; }
        public PersistFlagEnum PersistFlag { get; set; }
        public bool Status { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string LibUserLinkId { get; set; }


        //  public List<LibraryUsers> LibUsers{ get; set; }

        //public LibraryUsers(string libraryId,string persistFlag,bool status, string userid, String username)
        //{
        //    this.LibraryID = libraryId;
        //    this.PersistFlag = persistFlag;
        //    this.Status = status;
        //    this.UserID = userid;
        //    this.UserName = username;
        //}


        //public LibraryUsers()
        //{

        //    this.LibraryID = string.Empty;
        //    this.UserID = string.Empty;
        //    this.UserName = string.Empty;
        //    this.Status = false;
        //    this.PersistFlag = string.Empty;
        //}


        public List<LibraryUsers> SearchLibraryUserDetail(string LibraryID)
        {
            List<LibraryUsers> lbUsrList = new List<LibraryUsers>();

            LibraryMaintainenceClient proxy = null;
            SearchActiveUserResponse response = new SearchActiveUserResponse();

            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SearchActiveUserRequest request = new SearchActiveUserRequest();
                request.LibraryVO = new LibraryVO();
                if (request.LibraryVO != null)
                {
                    request.LibraryVO.LibraryID = LibraryID;
                    response = proxy.SearchActiveUserDetails(request);
                }
                // lbUsrList = new List<LibraryUsers>();
                foreach (LibraryVO libraryVO in response.ActiveUserSearchList)
                {
                    lbUsrList.Add(new LibraryUsers { LibraryID = libraryVO.LibraryID, UserID = libraryVO.UserId, Status = libraryVO.Is_active, UserName = libraryVO.UserName, LibUserLinkId = libraryVO.LibUserLinkId });
                }
                ////maxBoxTypeStorage = new List<ViewModels.SearchLibraryDetail>();
            }
            catch
            {
                //return response.ActiveUserSearchList;
                return lbUsrList;
            }
            finally
            {
                proxy.Close();
            }
            return lbUsrList;
            // return response.ActiveUserSearchList;
        }


        public List<LibraryUsers> SearchMenUsers()
        {
            List<LibraryUsers> lbUsrList = new List<LibraryUsers>();

            LibraryMaintainenceClient proxy = null;
            SearchMenUsersReponse response = new SearchMenUsersReponse();
            //SearchActiveUserResponse response = new SearchActiveUserResponse();

            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SearchMenUsersRequest request = new SearchMenUsersRequest();
                //SearchActiveUserRequest request = new SearchActiveUserRequest();
                request.LibraryVO = new LibraryVO();
                if (request.LibraryVO != null)
                {
                    request.LibraryVO.LibraryID = LibraryID;
                    response = proxy.SearchMenUserDetails(request);
                }
                // lbUsrList = new List<LibraryUsers>();
                foreach (LibraryVO libraryVO in response.MenUserSearchList)
                {
                    lbUsrList.Add(new LibraryUsers { UserID = libraryVO.UserId, UserName = libraryVO.UserName });
                }
                ////maxBoxTypeStorage = new List<ViewModels.SearchLibraryDetail>();
            }
            catch
            {
                //return response.ActiveUserSearchList;
                return lbUsrList;
            }
            finally
            {
                proxy.Close();
            }
            return lbUsrList;
            // return response.ActiveUserSearchList;
        }



        public List<LibraryUsers> SaveLibraryUserDetail(List<LibraryUsers> lbUsrList)
        {
            LibraryMaintainenceClient proxy = null;
            SaveActiveUserResponse response = new SaveActiveUserResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SaveActiveUserRequest request = new SaveActiveUserRequest();
                request.activeUserVOList = new List<LibraryVO>();

                if (request.activeUserVOList != null)
                {
                    for (int i = 0; i < lbUsrList.Count; i++)
                    {
                        LibraryVO libVo = new LibraryVO();
                        libVo.LibUserLinkId = lbUsrList[i].LibUserLinkId;
                        libVo.LibraryID = lbUsrList[i].LibraryID.ToUpper();
                        libVo.UserId = lbUsrList[i].UserID.ToUpper();
                        libVo.UserName = lbUsrList[i].UserName.ToUpper();
                        libVo.Is_active = lbUsrList[i].Status;
                        libVo.PersistFlag = lbUsrList[i].PersistFlag;

                        request.activeUserVOList.Add(libVo);

                        libVo = null;
                    }
                    //LibraryVO l = new LibraryVO();
                  
                  //  request.activeUserVOList = lbUsrList.ToList();

                    response = proxy.SaveUserDetails(request);

                    lbUsrList = new List<LibraryUsers>();
                    if(response != null)
                    {
                        if (response.ActiveUserVOList != null)
                        { 
                            foreach(LibraryVO libVO in response.ActiveUserVOList)
                            {
                            lbUsrList.Add(new LibraryUsers { LibUserLinkId = libVO.LibUserLinkId , UserID = libVO.UserId , UserName = libVO.UserName , LibraryID = libVO.LibraryID , Status = libVO.Is_active }); 
                            }
                        }
                    }                 
                }
               // request.activeUserVOList=lbUsrList;            
            }
            finally
            {
                proxy.Close();
            }
           
            return lbUsrList;
        }


    }





}
