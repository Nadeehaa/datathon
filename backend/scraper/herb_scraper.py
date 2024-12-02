import requests
from bs4 import BeautifulSoup
import time
import random

class HerbScraper:
    def __init__(self):
        self.base_urls = {
            'herbwisdom': 'https://www.herbwisdom.com/',
            'webmd': 'https://www.webmd.com/vitamins/ai/ingredientmono-',
            'wikipedia': 'https://en.wikipedia.org/wiki/'
        }
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.cache = {}

    def get_herb_details(self, herb_name):
        """Get herb details from multiple sources"""
        if herb_name in self.cache:
            return self.cache[herb_name]

        herb_details = {
            'name': herb_name,
            'scientific_name': '',
            'benefits': [],
            'side_effects': [],
            'interactions': [],
            'traditional_uses': [],
            'research_findings': []
        }

        try:
            # Scrape from multiple sources
            herb_details.update(self._scrape_herbwisdom(herb_name))
            time.sleep(random.uniform(1, 3))  # Random delay between requests
            
            herb_details.update(self._scrape_webmd(herb_name))
            time.sleep(random.uniform(1, 3))
            
            herb_details.update(self._scrape_wikipedia(herb_name))

            # Cache the results
            self.cache[herb_name] = herb_details
            
            return herb_details

        except Exception as e:
            print(f"Error scraping {herb_name}: {str(e)}")
            return herb_details

    def _scrape_herbwisdom(self, herb_name):
        """Scrape herb information from HerbWisdom"""
        details = {}
        try:
            url = f"{self.base_urls['herbwisdom']}{herb_name.lower().replace(' ', '-')}"
            response = requests.get(url, headers=self.headers)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Extract benefits
                benefits_section = soup.find('div', {'class': 'benefits'})
                if benefits_section:
                    details['benefits'] = [b.text.strip() for b in benefits_section.find_all('li')]

                # Extract traditional uses
                uses_section = soup.find('div', {'class': 'traditional-uses'})
                if uses_section:
                    details['traditional_uses'] = [u.text.strip() for u in uses_section.find_all('li')]

        except Exception as e:
            print(f"Error scraping HerbWisdom: {str(e)}")

        return details

    def _scrape_webmd(self, herb_name):
        """Scrape herb information from WebMD"""
        details = {}
        try:
            url = f"{self.base_urls['webmd']}{herb_name.lower().replace(' ', '-')}"
            response = requests.get(url, headers=self.headers)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Extract side effects
                side_effects_section = soup.find('div', {'class': 'side-effects'})
                if side_effects_section:
                    details['side_effects'] = [s.text.strip() for s in side_effects_section.find_all('li')]

                # Extract interactions
                interactions_section = soup.find('div', {'class': 'interactions'})
                if interactions_section:
                    details['interactions'] = [i.text.strip() for i in interactions_section.find_all('li')]

        except Exception as e:
            print(f"Error scraping WebMD: {str(e)}")

        return details

    def _scrape_wikipedia(self, herb_name):
        """Scrape herb information from Wikipedia"""
        details = {}
        try:
            url = f"{self.base_urls['wikipedia']}{herb_name.replace(' ', '_')}"
            response = requests.get(url, headers=self.headers)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Extract scientific name
                scientific_name = soup.find('span', {'class': 'binomial'})
                if scientific_name:
                    details['scientific_name'] = scientific_name.text.strip()

                # Extract research findings
                research_section = soup.find('span', {'id': 'Research'})
                if research_section:
                    research_content = research_section.find_next('p')
                    if research_content:
                        details['research_findings'] = [research_content.text.strip()]

        except Exception as e:
            print(f"Error scraping Wikipedia: {str(e)}")

        return details