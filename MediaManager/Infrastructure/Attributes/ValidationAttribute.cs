using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Web.Mvc;
using System.Globalization;

namespace MediaManager.Infrastructure.Attributes
{

    #region "Model State"

    public class SetModelStateAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
            filterContext.Controller.TempData["ModelState"] =
               filterContext.Controller.ViewData.ModelState;
        }
    }

    public class RestoreModelStateAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            if (filterContext.Controller.TempData.ContainsKey("ModelState"))
            {
                ModelStateDictionary modelState=(ModelStateDictionary)filterContext.Controller.TempData["ModelState"];
                //foreach (ModelState item in modelState.Values)
                //{
                //    filterContext.Controller.ViewData.ModelState.AddModelError("", item.Value);
                //}
                for (int index=0; index< modelState.Keys.Count;index++)
                {
                    //List<string> keyList = (List<string>)modelState.Keys;
                    //List<ModelState> valueList = (List<ModelState>)modelState.Values;
                    //filterContext.Controller.ViewData.ModelState.Add(keyList[index], valueList[index]);
                }
               
                //    ;
            }
        }
    }
    #endregion

    /// <summary>
    /// Define the comparison operators for
    /// the <see cref="CompareValidatorAttribute"/>.
    /// </summary>
    public enum CompareOperator
    {
        [Display(Name = "must be less than")]
        LessThan,

        [Display(Name = "cannot be more than")]
        LessThanEqual,

        [Display(Name = "must be the same as")]
        Equal,

        [Display(Name = "must be different from")]
        NotEqual,

        [Display(Name = "cannot be less than")]
        GreaterThanEqual,

        [Display(Name = "must be more than")]
        GreaterThan
    }


    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    public class CompareTwoDateValidationAttribute : ValidationAttribute, IClientValidatable
    {
        public CompareTwoDateValidationAttribute(CompareOperator compareOperator, string compareToProperty)
            : base("{0} {1} {2}")
        {
            CompareOperator = compareOperator;
            CompareToProperty = compareToProperty;
        }

        public CompareOperator CompareOperator { get; private set; }
        public string CompareToProperty { get; private set; }
        public string ErrorMessage { get; set; }
        /// <summary>
        /// Cache the property info for the compare to property.
        /// </summary>
        private PropertyInfo _compareToPropertyInfo;


        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;
            try
            {
                // Get the property that we need to compare to.
                this._compareToPropertyInfo = validationContext.ObjectType
                    .GetProperty(this.CompareToProperty);

                object compareToValue = (DateTime)this._compareToPropertyInfo
                    .GetValue(validationContext.ObjectInstance, null);

                int comparison = ((IComparable)value).CompareTo(compareToValue);

                //DateTime compareValue = (DateTime)value;
                bool isValid;
                if (comparison < 0)
                {
                    isValid = this.CompareOperator == CompareOperator.LessThan
                           || this.CompareOperator == CompareOperator.LessThanEqual
                           || this.CompareOperator == CompareOperator.NotEqual;
                }
                else if (comparison > 0)
                {
                    isValid = this.CompareOperator == CompareOperator.GreaterThan
                           || this.CompareOperator == CompareOperator.GreaterThanEqual
                           || this.CompareOperator == CompareOperator.NotEqual;
                }
                else
                {
                    isValid = this.CompareOperator == CompareOperator.LessThanEqual
                           || this.CompareOperator == CompareOperator.Equal
                           || this.CompareOperator == CompareOperator.GreaterThanEqual;
                }

                if (!isValid)
                {
                    return new ValidationResult(
                        this.FormatErrorMessage(validationContext.DisplayName),
                        new[] { validationContext.MemberName, this.CompareToProperty });
                }

            }
            catch (InvalidCastException)
            {
                return new ValidationResult("Make sure your date is >= than today");
            }
            return ValidationResult.Success;
        }

        /// <summary>
        /// Format the error message string using the property's
        /// name, the compare operator, and the comparison property's
        /// display name.
        /// </summary>
        /// <param name="name">The display name of the property validated.</param>
        /// <returns>The formatted error message.</returns>
        public override string FormatErrorMessage(string name)
        {
            string errorMessage = !String.IsNullOrEmpty(ErrorMessage) ? ErrorMessage : string.Format(this.ErrorMessageString,
                                    name,
                                    GetOperatorDisplay(this.CompareOperator),
                                    GetPropertyDisplay(this._compareToPropertyInfo));
            return errorMessage;
        }

        /// <summary>
        /// Get the display name for the specified compare operator.
        /// </summary>
        /// <param name="compareOperator">The operator.</param>
        /// <returns>The display name for the operator.</returns>
        private static string GetOperatorDisplay(CompareOperator compareOperator)
        {
            return typeof(CompareOperator)
                .GetField(compareOperator.ToString())
                .GetCustomAttributes(typeof(DisplayAttribute), false)
                .Cast<DisplayAttribute>()
                .Single()
                .GetName();
        }

        /// <summary>
        /// Get the display name for the specified property.
        /// </summary>
        /// <param name="property">The property.</param>
        /// <returns>The display name of the property.</returns>
        private static string GetPropertyDisplay(PropertyInfo property)
        {
            DisplayAttribute attribute = property
                .GetCustomAttributes(typeof(DisplayAttribute), false)
                .Cast<DisplayAttribute>()
                .SingleOrDefault();

            return attribute != null ? attribute.GetName() : property.Name;
        }


        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
        {
            yield return new ModelClientValidationRule
            {
                ErrorMessage = this.ErrorMessage,
                ValidationType = "comparetwodatevalidation"
            };
        }
    }



    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    public class IsValidDateAttribute : ValidationAttribute, IClientValidatable
    {
            public string ErrorMessage { get; set; }

            public IsValidDateAttribute(string errorMessage)
                : base(errorMessage)
            {
                ErrorMessage = errorMessage;
            }

            public override string FormatErrorMessage(string name)
            {
                return string.Format(ErrorMessage, name);
            }

            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                var dateEntered = (DateTime)value;
                try
                {
                    DateTime dt = DateTime.Parse(value.ToString());
                    if (dt!= DateTime.MinValue)
                        return ValidationResult.Success;
                    else
                    {
                        var message = FormatErrorMessage(dateEntered.ToShortDateString());
                        return new ValidationResult(message);                        
                    }
                }
                catch
                {
                    var message = FormatErrorMessage(dateEntered.ToShortDateString());
                    return new ValidationResult(message);
                }
            }

            public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
            {
                yield return new ModelClientValidationRule
                {
                    ErrorMessage = this.ErrorMessage,
                    ValidationType = "isvaliddate"
                };
            }
    }


    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    public class IsValidFieldAttribute : ValidationAttribute, IClientValidatable
    {
        public string ErrorMessage { get; set; }

        public IsValidFieldAttribute(string errorMessage)
            : base(errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        public override string FormatErrorMessage(string name)
        {
            return string.Format(ErrorMessage, name);
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
                    return ValidationResult.Success;
        }
        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
        {
            yield return new ModelClientValidationRule
            {
                ErrorMessage = this.ErrorMessage,
                ValidationType = "isvalidfield"
            };
        }
    }
}