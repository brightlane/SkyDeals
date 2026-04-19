// Central affiliate configuration
export const AFFILIATE_URL = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

// Optional builder if you want to append parameters later
export function getAffiliateUrl(extraParams = "") {
  return `${AFFILIATE_URL}${extraParams}`;
}
