<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Wordcloud db upgrade
 *
 * @package    mod_wordcloud
 * @copyright  2020 University of Vienna
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

/**
 * xmldb_streamlti_upgrade is the function that upgrades
 * the streamlti module database when is needed
 *
 * This function is automaticly called when version number in
 * version.php changes.
 *
 * @param int $oldversion New old version number.
 *
 * @return boolean
 */
function xmldb_wordcloud_upgrade($oldversion) {
    global $DB;

    $dbman = $DB->get_manager();

    if ($oldversion < 2020081900 && !$dbman->field_exists('wordcloud','lastwordchange')) {
        $table = new xmldb_table('wordcloud');
        $field = new xmldb_field('lastwordchange', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0');

        $dbman->add_field($table, $field);

        upgrade_mod_savepoint(true, 2020081900, 'wordcloud');
    }

    return true;
}
