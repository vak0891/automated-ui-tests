export default class Search {
  constructor() {
    this.searchKeyword = $('#Keywords');
    this.searchButton = $('.btn-linear-green');
    this.companyOverview = $('#company-overview');
    this.companySalaryText = $('.salary-estimator_bubble_text');
    this.companySalaryValue = $('.salary-estimator_bubble_salary');
    this.searchData = $$('.data-results-title');
  }
}
