from django.db import models
from django.utils.timezone import now
from datetime import datetime
from django.core.files.storage import FileSystemStorage

fspath = FileSystemStorage(location='/media/uploads/photos')
#Admin model
class Users(models.Model):
    id = models.AutoField(primary_key=True)
    uname = models.CharField(max_length=100,blank=False)
    upass = models.CharField(max_length=100,blank=False)
    umail = models.CharField(max_length=100,blank=False,unique=True)
    uphone = models.CharField(max_length=100,blank=False)
    userotp = models.CharField(max_length=100,blank=True, null=True)
    #utype  = models.IntegerField(blank=False,null= True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    isactive = models.BooleanField(default=True, editable=False)
    selectedcontainer=models.IntegerField(null=True,blank=True)
    healthcentertype =models.IntegerField(null=True,blank=True)
    isuser = models.BooleanField(default=False, editable=True)
    isotpstatus = models.BooleanField(default=False, editable=True)

    class Meta:
        db_table = "users"


class RegistrationType(models.Model):
    id = models.AutoField(primary_key=True)
    registrationtypename=models.CharField(max_length=255, blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table= "registrationtype"

class UserStatus(models.Model):
    id = models.AutoField(primary_key=True)
    status=models.CharField(max_length=255, blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table= "userstatus"

class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    qualification = models.CharField(max_length=255, blank=True, null=True)
    specialist = models.CharField(max_length=255, blank=True, null=True)
    experience = models.CharField(max_length=255, blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "doctor"
class DocCategory(models.Model):
    id = models.AutoField(primary_key=True)
    doccatname = models.CharField(max_length=255, blank=True, null=True)
    desc = models.TextField(null=True, blank=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "doccategory"

class Helathcenter(models.Model):
    id = models.AutoField(primary_key=True)
    hel_name = models.CharField(max_length=255, blank=True, null=True)
    hel_cat = models.CharField(max_length=255, blank=True, null=True)
    contact_no = models.CharField(max_length=255, blank=True, null=True)
    contact_person = models.CharField(max_length=255, blank=True, null=True)
    address1 = models.CharField(max_length=255, blank=True, null=True)
    address2 = models.CharField(max_length=255, blank=True, null=True)
    pcode = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "helathcenter"
class HCategory(models.Model):
    id = models.AutoField(primary_key=True)
    helcatname = models.CharField(max_length=255, blank=True, null=True)
    desc = models.TextField(null=True, blank=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "hcategory"
class State(models.Model):
    id = models.AutoField(primary_key=True)
    statename = models.CharField(max_length=255, blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "state"
class City(models.Model):
    id = models.AutoField(primary_key=True)
    stateid = models.IntegerField(null=True)
    statename= models.CharField(max_length=255, blank=True, null=True)
    cityname = models.CharField(max_length=255, blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    # state = models.ForeignKey(State, on_delete=models.CASCADE)
    class Meta:
        db_table = "city"

class JobCategory(models.Model):
    id = models.AutoField(primary_key=True)
    jobcatname = models.CharField(max_length=255, blank=True, null=True)
    desc = models.TextField(null=True, blank=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "jobcategory"

class UserCategory(models.Model):
    id = models.AutoField(primary_key=True)
    usercatname = models.CharField(max_length=255, blank=True, null=True)
    desc = models.TextField(null=True, blank=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "usercategory"

class Usertypes(models.Model):
    id = models.AutoField(primary_key=True)
    usertypename = models.CharField(max_length=255, blank=True, null=True)
    desc = models.TextField(null=True, blank=True)
    usercategory = models.ForeignKey(UserCategory,on_delete=models.CASCADE, blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False,blank=True)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "usertypes"


class GenderMaster(models.Model):
    id = models.AutoField(primary_key=True)
    gendername = models.CharField(max_length=100,blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)

    class Meta:
        db_table = "gendermaster"

class UserProfileMasterNew(models.Model):
    id = models.AutoField(primary_key=True)
    uid =models.IntegerField(blank=True, null=True)
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    email  =models.CharField(max_length=255, blank=True, null=True)
    categoryid= models.IntegerField(blank=True, null=True) #foreignkeymap required
    usertypeid =models.IntegerField(blank=True, null=True) #foreignkeymap required
    phonenumber =models.CharField(max_length=100,blank=True, null=True)
    gender =models.IntegerField(blank=True, null=True)
    dateofbirth = models.DateTimeField(blank=True, null=True)
    icnumber = models.CharField(max_length=255, blank=True, null=True)
    profilepic = models.ImageField(upload_to='uploads',blank=True, null=True)
    profilepicback = models.ImageField(upload_to='uploads',blank=True, null=True)
    profilepicfront = models.ImageField(upload_to='uploads',blank=True, null=True)
    bankname =models.CharField(max_length=100,blank=True, null=True)
    bankaccountnumber =models.CharField(max_length=100,blank=True, null=True)
    apcnumber =models.CharField(max_length=100,blank=True, null=True)
    apcexpirydate = models.DateTimeField(blank=True, null=True)
    mmcnumber =models.CharField(max_length=100,blank=True, null=True)
    graduatedfrom = models.CharField(max_length=100,blank=True, null=True)
    graduatedyear = models.DateTimeField(blank=True, null=True)
    currentemployer = models.CharField(max_length=100,blank=True, null=True)
    practicelocation = models.CharField(max_length=100,blank=True, null=True)
    registrationtypeid = models.IntegerField(blank=True, null=True)
    apcproof = models.ImageField(upload_to='uploads',blank=True, null=True)
    certificateproof = models.ImageField(upload_to='uploads',blank=True, null=True)
    otherdocuments = models.ImageField(upload_to='uploads',blank=True, null=True)
    yearofservice = models.IntegerField(blank=True, null=True)
    address1 = models.CharField(max_length=500,blank=True, null=True)
    address2 = models.CharField(max_length=500,blank=True, null=True)
    countryid = models.IntegerField(blank=True, null=True)
    stateid = models.IntegerField(blank=True, null=True) #foreigkeymap required
    cityid = models.IntegerField(blank=True, null=True) #foreigkeymap required
    postalcode = models.CharField(max_length=15,blank=True, null=True)
    aboutme = models.CharField(max_length=500,blank=True, null=True)
    statusid =models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=500,blank=True, null=True)
    registrationdate = models.DateTimeField(blank=True, null=True)
    verifieddate = models.DateTimeField(blank=True, null=True)
    verifiedby = models.CharField(max_length=100,blank=True, null=True)
    verificationnotes = models.CharField(max_length=500,blank=True, null=True)
    jobcentername = models.CharField(max_length=500,blank=True, null=True)
    jobcenterlocation = models.CharField(max_length=500,blank=True, null=True)
    jobcenterbrnnumber = models.CharField(max_length=500,blank=True, null=True)
    #jobcenterpostalcode = models.CharField(max_length=500,blank=True, null=True)
    healthcentertype =models.IntegerField(null=True,blank=True)
    userstatusid= models.IntegerField(blank=True, null=True)
    userjobstatusname =models.CharField(max_length=500, blank=True)
    userstatusclass =models.CharField(max_length=500, blank=True)
    userstatusicon =models.CharField(max_length=500, blank=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True, null=True)
    updatedby = models.CharField(max_length=255, blank=True, null=True)
    deleted = models.CharField(max_length=20, blank=True)
    isactive = models.BooleanField(default=True, editable=False)
    notifymode =models.IntegerField(blank=True, null=True)
    isprofilecompleted = models.BooleanField(default=False, editable=False)
    notifymode =models.IntegerField(blank=True, null=True)
    class Meta:
        db_table = "userprofilemasternew"



class Country(models.Model):
    id = models.AutoField(primary_key=True)
    countryname = models.CharField(max_length=255, blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "country"


class JobLanguage(models.Model):
    id = models.AutoField(primary_key=True)
    languagename = models.CharField(max_length=255, blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "joblanguage"


class JobManagerMainClinic(models.Model):
    id = models.AutoField(primary_key=True)
    uuid=models.IntegerField(blank=True, null=True)
    jobcentername=models.CharField(max_length=100,blank=True, null=True)
    #userprofilemasternew =models.ForeignKey(UserProfileMasterNew, on_delete=models.CASCADE,blank=True, null=True)
    jobname = models.CharField(max_length=100,blank=True, null=True)
    jobnoofvacancies = models.IntegerField(blank=True, null=True)
    jobtype=  models.CharField(max_length=255,null=True, blank=True)
    jobmoderate=models.CharField(max_length=500,null=True, blank=True)
    jobsalary = models.DecimalField(max_digits = 10, decimal_places = 2,blank=True, null=True)
    jobstartdate=models.DateTimeField(blank=True, null=True)
    jobstarttime=models.CharField(max_length=500,null=True, blank=True)
    jobtodate=models.DateTimeField(blank=True, null=True)
    jobtotime =models.CharField(max_length=500,null=True, blank=True)
    jobtraapplicable=models.CharField(max_length=255, blank=True)
    jobtraallowance=models.DecimalField(max_digits = 10, decimal_places = 2,blank=True, null=True)
    jobproceduresapplicble=models.CharField(max_length=255, blank=True)
    jobprocedureallowance =models.DecimalField(max_digits = 10, decimal_places = 2,blank=True, null=True)
    jobcategory=models.ForeignKey(UserCategory, on_delete=models.CASCADE,blank=True, null=True)
    jobusertype =models.ForeignKey(Usertypes, on_delete=models.CASCADE,blank=True, null=True)
    joblanguage =models.ForeignKey(JobLanguage, on_delete=models.CASCADE,blank=True, null=True)
    jobappointmentdate=models.DateTimeField(blank=True, null=True)
    yearofexperience=models.IntegerField(blank=True, null=True)
    ispublished=models.BooleanField(default=False, editable=True,blank=True, null=True)
    isapplied = models.BooleanField(default=False, editable=True,blank=True, null=True)
    applieduserid = models.IntegerField(blank=True, null=True)
    joblatitude =models.DecimalField(max_digits = 10, decimal_places = 2,blank=True, null=True)
    joblongitude =models.DecimalField(max_digits = 10, decimal_places = 2,blank=True, null=True)
    jobdescription=models.CharField(max_length=500, blank=True)
    jobcountry =models.ForeignKey(Country, on_delete=models.CASCADE,blank=True, null=True)
    jobstate =models.ForeignKey(State, on_delete=models.CASCADE,blank=True, null=True)
    jobcity =models.ForeignKey(City, on_delete=models.CASCADE,blank=True, null=True)
    jobstatusid= models.IntegerField(blank=True, null=True)
    isactive= models.BooleanField(default=True, editable=True,blank=True, null=True)
    ishired= models.BooleanField(default=False, editable=True,blank=True, null=True)
    jobstatusname =models.CharField(max_length=500,null=True, blank=True)
    jobstatusclass =models.CharField(max_length=500,null=True, blank=True)
    jobstatusicon =models.CharField(max_length=500,null=True, blank=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)

    class Meta:
        db_table = "jobmanagermainclinic"


class JobManagerMainApplied(models.Model):
    id = models.AutoField(primary_key=True)
    jobmanagermainclinic =models.ForeignKey(JobManagerMainClinic, on_delete=models.CASCADE,blank=True, null=True)
    userprofilemasternew =models.ForeignKey(UserProfileMasterNew, on_delete=models.CASCADE,blank=True, null=True)
    isapplied = models.BooleanField(default=True, editable=True,blank=True, null=True)
    ishired = models.BooleanField(default=False, editable=True,blank=True, null=True)
    isfollow = models.BooleanField(default=False, editable=True,blank=True, null=True)
    isfollowing = models.BooleanField(default=False, editable=True,blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "jobmanagermainapplied"

class JobFollowerList(models.Model):
    id = models.AutoField(primary_key=True)
    uid = models.IntegerField(blank=True, null=True)
    userfollowingid= models.IntegerField(blank=True, null=True)
    userfollowing =models.ForeignKey(UserProfileMasterNew, on_delete=models.CASCADE,blank=True, null=True)
    isfollowing = models.BooleanField(default=True, editable=True,blank=True, null=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "jobfollowerlist"

class MailTemplateTypes(models.Model):
    id = models.AutoField(primary_key=True)
    typename= models.CharField(max_length=255, blank=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=4000, blank=True)
    class Meta:
        db_table = "mailtemplatetypes"

class MailTemplateList(models.Model):
    id = models.AutoField(primary_key=True)
    title= models.CharField(max_length=255, blank=True)
    mailtemplatetype =models.ForeignKey(MailTemplateTypes, on_delete=models.CASCADE,blank=True, null=True)
    subject= models.CharField(max_length=255, blank=True)
    message= models.CharField(max_length=255, blank=True)
    createdon = models.DateTimeField(default=now, editable=False)
    updatedon = models.DateTimeField(default=datetime.now, blank=True)
    createdby = models.CharField(max_length=255, blank=True)
    updatedby = models.CharField(max_length=255, blank=True)
    deleted = models.CharField(max_length=4000, blank=True)
    class Meta:
        db_table = "mailtemplate"