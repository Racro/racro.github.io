# -*- encoding: utf-8 -*-
# stub: jekyll-archives-v2 0.0.6 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-archives-v2".freeze
  s.version = "0.0.6"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/george-gca/jekyll-archives-v2/issues", "changelog_uri" => "https://github.com/george-gca/jekyll-archives-v2/releases", "homepage_uri" => "https://george-gca.github.io/jekyll-archives-v2/", "source_code_uri" => "https://github.com/george-gca/jekyll-archives-v2" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["George Corr\u00EAa de Ara\u00FAjo".freeze]
  s.date = "2024-12-05"
  s.description = "Automatically generate collections archives by dates, tags, and categories.".freeze
  s.homepage = "https://george-gca.github.io/jekyll-archives-v2/".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0".freeze)
  s.rubygems_version = "3.3.26".freeze
  s.summary = "Collections archives for Jekyll.".freeze

  s.installed_by_version = "3.3.26" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3.6", "< 5.0"])
    s.add_runtime_dependency(%q<activesupport>.freeze, [">= 0"])
    s.add_development_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_development_dependency(%q<minitest>.freeze, [">= 0"])
    s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    s.add_development_dependency(%q<rdoc>.freeze, [">= 0"])
    s.add_development_dependency(%q<rubocop-jekyll>.freeze, ["~> 0.9"])
    s.add_development_dependency(%q<shoulda>.freeze, [">= 0"])
  else
    s.add_dependency(%q<jekyll>.freeze, [">= 3.6", "< 5.0"])
    s.add_dependency(%q<activesupport>.freeze, [">= 0"])
    s.add_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_dependency(%q<minitest>.freeze, [">= 0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<rdoc>.freeze, [">= 0"])
    s.add_dependency(%q<rubocop-jekyll>.freeze, ["~> 0.9"])
    s.add_dependency(%q<shoulda>.freeze, [">= 0"])
  end
end
